import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppSettings } from '../../shared/app.settings';
import { Login } from './login';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LocalStorage } from '../../shared/local-storage';

@Injectable()
export class LoginService {

    private loggedIn = false;
    private tokenUrl = AppSettings.TASKCAT_BASE + "token";

    constructor(private http: Http, private _localStorage: LocalStorage) {
        this.loggedIn = false;
    }

    login(loginModel: Login) {
        let headers = new Headers();
        let urlEncodedParam =
            "grant_type=" + loginModel.GrantType +
            "&username=" + loginModel.UserName +
            "&password=" + loginModel.Password +
            "&client_id=" + loginModel.ClientId;

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.tokenUrl, urlEncodedParam, { headers })
            .map((res: Response) => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('Response status: ' + res.status);
                }
                return this._extractAndSaveAuthData(res);
            })
            .catch((error: Response) => {
                this.loggedIn = false;
                return this._extractAuthError(error);
            });
    }

    private _extractAuthError(res: Response) {
        let error = res.json();
        let errorMsg = error.error_description || 'Server error';
        console.error(errorMsg);
        return Observable.throw(errorMsg);
    }

    private _extractAndSaveAuthData(res: Response) {
        let data = res.json();
        if (data) {
            this.loggedIn = true;
        }
        else {
            throw new Error("Invalid/blank auth data, Fatal Error");
        }

        this._localStorage.setObject('auth_token', data);
        return data;
    }

    logout() {
        this._localStorage.remove('auth_token');
        this.loggedIn = false;
    }

    public get isLoggedIn() {
        return this.loggedIn;
    }
}