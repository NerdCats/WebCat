import { Injectable } from '@angular/core';
import { SecureHttp } from '../../shared/secure-http';
import { Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {PageEnvelope, Pagination} from '../../shared/pagination';

import {AppSettings} from '../../shared/app.settings';
import {Job, JobState} from '../shared/job';

import {QueryBuilder} from '../../shared/query-builder/query-builder';

@Injectable()
export class JobService {
    private _queryBuilder: QueryBuilder;

    constructor(private shttp: SecureHttp) {
    }

    private jobUrl = AppSettings.TASKCAT_API_BASE + 'job';
    private assetLocationUrl = AppSettings.SHADOWCAT_API_BASE + "location/";

    getJobs(jobUrl): Observable<PageEnvelope<Job>> {
        return this.shttp.secureGet(jobUrl)
            .map(this._extractData)
            .catch(error => {
                let errMsg = error.message || 'Exception when fetching job history';
                console.error(errMsg); // log to console instead
                return Observable.throw(errMsg);
            });
    }

    private jobStateQueryString(state: string){
        var jobStateParam = "";
        switch(state){
				case 'ENQUEUED':
				case 'COMPLETED':
				case 'IN_PROGRESS':
				case 'CANCELLED':
					jobStateParam = "State eq '"+ state +"'";
					break;

				case 'PICKUP_IN_PROGRESS':
					jobStateParam = "Tasks/any(task: task/State eq 'IN_PROGRESS' and task/Type eq 'PackagePickUp')";
					break;
				case 'DELIVERY_IN_PROGRESS':
					jobStateParam = "Tasks/any(task: task/State eq 'IN_PROGRESS' and task/Type eq 'Delivery')";
					break;
				case 'CASH_DELIVERY_IN_PROGRESS':
					jobStateParam = "Tasks/any(task: task/State eq 'IN_PROGRESS' and task/Type eq 'SecureCashDelivery')";
					break;
				case 'RETURN_DELIVERY_IN_PROGRESS':
					jobStateParam = "Tasks/any(task: task/State eq 'IN_PROGRESS' and task/Variant eq 'return' and task/Type eq 'Delivery')";
					break;
				case 'RETRY_DELIVERY_IN_PROGRESS':
					jobStateParam = "Tasks/any(task: task/State eq 'IN_PROGRESS' and task/Variant eq 'retry' and task/Type eq 'Delivery')";
					break;


				case 'PICKUP_COMPLETED':
					jobStateParam = "Tasks/any(task: task/State eq 'COMPLETED' and task/Type eq 'PackagePickUp')";
					break;
				case 'DELIVERY_COMPLETED':
					jobStateParam = "Tasks/any(task: task/State eq 'COMPLETED' and task/Type eq 'Delivery')";
					break;
				case 'CASH_DELIVERY_COMPLETED':
					jobStateParam = "Tasks/any(task: task/State eq 'COMPLETED' and task/Type eq 'SecureCashDelivery')";
					break;
				case 'RETURNED_DELIVERY_COMPLETED':
					jobStateParam = "Tasks/any(task: task/State eq 'COMPLETED' and task/Variant eq 'return' and task/Type eq 'Delivery')";
					break;
				case 'RETRY_DELIVERY_COMPLETED':
					jobStateParam = "Tasks/any(task: task/State eq 'COMPLETED' and task/Variant eq 'retry' and task/Type eq 'Delivery')";
					break;
			}
        return jobStateParam;
    }

    getHistoryWithPageNumber(state:string,
                            paymentStatus: string,
                            page:number, pageCount: number,
                            startTimeISO: string, endTimeISO: string,
                            searchText: string,
                            orderBy: string, orderByTime:string, orderByTimeDirection: string,
                            filterTime: string)
                            : Observable<PageEnvelope<Job>> {
        this._queryBuilder = new QueryBuilder();
        let filterArray: any = [];
        if(state !== undefined && state !== "" && state !== "ALL") {
            filterArray.push({
                                propName: "",
                                comparator: "",
                                value: this.jobStateQueryString(state)
                            })
        }
        if(paymentStatus !== "ALL"){
            filterArray.push({
                                propName: "PaymentStatus",
                                comparator: "eq",
                                value: "'" + paymentStatus + "'"
                            })
        }

        if(startTimeISO){
            filterArray.push({
                propName: filterTime,
                comparator: "gt",
                value: "datetime'"+ startTimeISO +"'"
            })
        }
        if(endTimeISO){
            filterArray.push({
                propName: filterTime,
                comparator: "lt",
                value: "datetime'"+ endTimeISO +"'"
            })
        }


        if(searchText){
            filterArray.push(
            {
                propName: "",
                comparator: "",
                value: " substringof('"+ searchText +"',Order/From/Address) or substringof('"+ searchText +"',Order/To/Address) or substringof('"+ searchText +
                "',HRID) or substringof('"+ searchText +"',Order/ReferenceInvoiceId) or Order/OrderCart/PackageList/any(package: substringof('"+searchText+"',package/Item))"
            })
        }


        let queryString: string = this._queryBuilder
            .filterBy(filterArray)
            .orderBy([
            {
                propName: orderByTime,
                orderDirection: orderByTimeDirection
            }])
            .page(page)
            .pageSize(pageCount)
            .toQueryString();

        let historyUrl = this.jobUrl + '/odata' + queryString;
        return this.getJobs(historyUrl)
    }

    getJobsWithReference(searchText: string, page: number){
        let filterArray: any = [];

        filterArray.push([
            {
                propName: "substringof('"+ searchText +"',Order/To/Address)"
            },
            {
                propName: "substringof('"+ searchText +"',HRID)"
            }
        ])
        let queryString: string = this._queryBuilder.filterBy(filterArray)
                                                    .page(0)
                                                    .toQueryString();
        let historyUrl = this.jobUrl + '/odata' + queryString;
        console.log(historyUrl);

    }


    getJob(jobId): Observable<Job>{
        return this.shttp.secureGet(this.jobUrl + "/" + jobId)
            .map((res: Response) => {
                let job = new Job();
                let jobJson = res.json();
                job = Job.fromJSON(jobJson);
                return  job;
            })
            .catch(error => {
                return  Observable.throw(error);
            })
    }

    getAssetLocation(assetId): Observable<Object>{
        return this.shttp.secureGet(this.assetLocationUrl + assetId)
            .map((res: Response) => {
                let assetLocation = res.json();
                return assetLocation;
            })
            .catch(error => {
                return Observable.throw(error);
            })
    }

    getJobsByState(state: JobState): Observable<PageEnvelope<Job>> {
        var url = "";
        switch(state){
            case "ENQUEUED":
            case "IN_PROGRESS":
            case "COMPLETED":
            case "CANCELLED":
                url = this.jobUrl + '/odata' + "?$filter=State eq " + "'" + state + "'";
                break;
            case "RETURNED":
                url = this.jobUrl + '/odata' + "?$filter=Tasks/any(task: task/State eq 'COMPLETED' and task/Variant eq 'return' and task/Type eq 'Delivery')";
                break;
            default:
                url = this.jobUrl + '/odata'
                break;

        }
        return this.shttp.secureGet(url)
            .map(this._extractData)
            .catch(error => {
                let errMsg = error.message || 'Exception when fetching job by state';
                console.error(errMsg); // log to console instead
                return Observable.throw(errMsg);
            });
    }

    private _extractData(res: Response): PageEnvelope<Job> {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let json = res ? res.json() : null;
        let castedJobs = new Array<Job>();
        if (json) {
            let jobs = json.data;
            for (let index = 0; index < jobs.length; index++) {
                let job = Job.fromJSON(jobs[index]);
                castedJobs.push(job);
            }

            let pagedData = new PageEnvelope<Job>();
            pagedData.data = castedJobs;
            pagedData.pagination = json.pagination;

            return pagedData;
        }

        return json;
    }
}
