import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from './user.registration';
import { User } from './user';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../shared/app.settings';

@Injectable()
export class AccountService {
    constructor(private http: Http) { }

    private accountUrl = 'account';  // URL to web API

    register(registration: UserRegistration): Observable<User> {
        let body = JSON.stringify(registration);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(AppSettings.TASKCAT_API_BASE + this.accountUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }

        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        // We should use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}