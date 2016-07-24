import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {PageEnvelope, Pagination} from '../../shared/pagination';

import {AppSettings} from '../../shared/app.settings';
import {Job, JobState} from '../shared/job';

import {QueryBuilder} from '../../shared/query-builder/query-builder';

@Injectable()
export class JobTrackService {
    private _queryBuilder: QueryBuilder;

    constructor(private http: Http) {
        // INFO: Should be injected here
        this._queryBuilder = new QueryBuilder();
    }

    private jobUrl = AppSettings.TASKCAT_API_BASE + 'job';
    private assetLocationUrl = AppSettings.SHADOWCAT_API_BASE + "location/";




    getJob(jobId): Observable<Job>{
        return this.http.get(this.jobUrl + "/" + jobId)
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
        return this.http.get(this.assetLocationUrl + assetId)
            .map((res: Response) => {
                let assetLocation = res.json();
                return assetLocation;
            })
            .catch(error => {
                return Observable.throw(error);
            })
    }
}
