import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { UserRegistration } from './user-registration';
import { UserRegistrationBase } from './user-registration-base';
import { EnterpriseUserRegistration } from './enterprise-user-registration';
import { User } from './user';
import { UserTypes } from './user-types';
import { AvailibilityResponse } from './availibility-response';
import { AppSettings } from '../../shared/app.settings';

@Injectable()
export class AccountService {
    constructor(private http: Http) { }

    private accountUrl = AppSettings.TASKCAT_API_BASE + 'account';  // URL to web API

    private getRequestBody(registration: UserRegistrationBase): string {
        if (registration.Type == UserTypes.TYPE_USER) {
            var data = registration as UserRegistration;
            console.log(data);
            return JSON.stringify(registration as UserRegistration);
        }
        else if (registration.Type == UserTypes.TYPE_ENTERPRISE) {
            return JSON.stringify(registration as EnterpriseUserRegistration);
        }

        throw new Error("Invalid/Unsupported User Type provided");
    }

    register(registration: UserRegistrationBase): Observable<User> {
        let body: string = this.getRequestBody(registration);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.accountUrl + "/register", body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    check(propertyName: string, suggestedValue: string): Observable<AvailibilityResponse> {
        return this.http.get(this.accountUrl + '/check?' + propertyName + "=" + suggestedValue)
            .map(this.extractData)
            .catch(this.handleError);
    }

    confirmEmail(userId: string, code: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId);
        params.set('code', code);

        return this.http.get(this.accountUrl + '/ConfirmEmail', { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    resendConfirmEmail(userId: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId);

        return this.http.get(this.accountUrl + '/ResendConfirmEmail', { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }

        if (res == undefined) {
            return  res.json() || {};
        }
        return {};
    }

    private handleError(error: any) {
        // We should use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}