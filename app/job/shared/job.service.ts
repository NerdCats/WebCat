import { Injectable } from '@angular/core';
import { SecureHttp } from '../../shared/secure-http';
import { Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {PageEnvelope, Pagination} from '../../shared/pagination';

import {AppSettings} from '../../shared/app.settings';
import {Job} from '../shared/job';

@Injectable()
export class JobService {
    constructor(private shttp: SecureHttp) { }

    private jobUrl = AppSettings.TASKCAT_API_BASE + 'job';

    getHistory(): Observable<PageEnvelope<Job>> {
        return this.shttp.secureGet(this.jobUrl + '/odata')
            .map((res: Response) => {
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
            })
            .catch(error => {
                let errMsg = error.message || 'Exception when fetching job history';
                console.error(errMsg); // log to console instead
                return Observable.throw(errMsg);
            });
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
}
