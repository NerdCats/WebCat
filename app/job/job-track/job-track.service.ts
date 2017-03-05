import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PageEnvelope, Pagination } from '../../shared/pagination';

import { AppSettings } from '../../shared/app.settings';
import { Job, JobState } from '../shared/job';
import { Comment } from '../shared/comment';
import { LocalStorage } from '../../shared/local-storage';


@Injectable()
export class JobTrackService {
    private authToken: string;

    constructor(private http: Http, private localStorage: LocalStorage) {
        this.localStorage = localStorage;
        this.authToken = this.localStorage.getObject('auth_token');
    }

    private jobUrl = AppSettings.TASKCAT_API_BASE;
    private assetLocationUrl = AppSettings.SHADOWCAT_API_BASE + "location/";




    getJob(jobId): Observable<Job>{
        return this.http.get(this.jobUrl + "/job/" + jobId)
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

    getComments(jobId): Observable<Comment>{
        return this.http.get(this.jobUrl + "/Comment/Job/" + jobId, this._getRequestOptionArgs())
        .map((res: Response) => {
            let comments: Comment[] = res.json();
            return comments;
        })
        .catch(error => {
            return Observable.throw(error);
        })
    }
    private _getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        let _authToken = this.localStorage.getObject('auth_token');
        if (!options) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        try
        {
            if(_authToken["access_token"] !== null)
            {
                options.headers.append('Content-Type', 'application/json');
                options.headers.append("Authorization", "bearer " + _authToken["access_token"]);
            }
        }
        catch(ex)
        {

        }


        return options;
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
