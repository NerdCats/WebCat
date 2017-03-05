import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppSettings } from '../../shared/app.settings';
import { Login } from './login';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LocalStorage } from '../../shared/local-storage';

@Injectable()
export class LoginService {

    private loggedIn = false;

    private tokenUrl = AppSettings.TASKCAT_API_BASE + "auth/token";
    private AUTH_TOKEN_KEY = "auth_token";

    private isLoggedInSource = new Subject<boolean>();

    loggedInAnnounced = this.isLoggedInSource.asObservable();

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

    logout(){
        this._localStorage.remove(this.AUTH_TOKEN_KEY);
        this._localStorage.remove(this.UserId);

        this.loggedIn = false;
        window.location.reload();
    }

    announceLoggedIn(isLoggedIn: boolean) {
        this.isLoggedInSource.next(isLoggedIn);
    }

    public get isLoggedIn() {
        this._checkAlreadyLoggedIn();
        this.announceLoggedIn(this.loggedIn);
        return this.loggedIn;
    }

    public get AuthData() {
        return this._localStorage.get(this.AUTH_TOKEN_KEY);
    }

    public get ProfileData() {
        return this._localStorage.get(this.UserId);
    }

    public get UserId() {
        return JSON.parse(this._localStorage.get(this.AUTH_TOKEN_KEY)).userId;
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
            // FIXME: Since users will be able to browse vendors without logging in
            // Lets not throw this error now!
            // throw new Error("Invalid/blank auth data, Fatal Error");
            this.loggedIn = false;
        }
        this._localStorage.setObject(this.AUTH_TOKEN_KEY, data);
        this._getAndSaveProfileData();
        return data;
    }

    private _getAndSaveProfileData(){
        let profileUrl = AppSettings.TASKCAT_API_BASE + "Account/Profile/" + this.UserId;
        this.http.get(profileUrl)
            .subscribe(
                res => {
                    this._localStorage.setObject(this.UserId, res.json())
                }, err => {
                    return Observable.throw(err);
                }
            )
    }

    private _checkAlreadyLoggedIn() {
        if (this._localStorage.getObject(this.AUTH_TOKEN_KEY)) {
            // INFO: Refresh token usage might be good here
            // Or we can automatically login every time ;)
            this.loggedIn = true;
        }
    }
}