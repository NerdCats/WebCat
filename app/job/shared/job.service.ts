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
        // INFO: Should be injected here
        this._queryBuilder = new QueryBuilder();
    }

    private jobUrl = AppSettings.TASKCAT_API_BASE + 'job';

    getHistory(): Observable<PageEnvelope<Job>> {
        let queryString: string = this._queryBuilder.orderBy([
            {
                propName: "CreateTime",
                orderDirection: "desc"
            }]).toQueryString();

        return this.shttp.secureGet(this.jobUrl + '/odata' + queryString)
            .map(this._extractData)
            .catch(error => {
                let errMsg = error.message || 'Exception when fetching job history';
                console.error(errMsg); // log to console instead
                return Observable.throw(errMsg);
            });
    }

    getJobsByState(state: JobState): Observable<PageEnvelope<Job>> {
        return this.shttp.secureGet(this.jobUrl + '/odata' + "?$filter=State eq " + "'" + state + "'")
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
