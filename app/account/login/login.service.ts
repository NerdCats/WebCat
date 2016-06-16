import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from '../../shared/app.settings';
import { Login } from './login';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    private loggedIn = false;
    private tokenUrl = AppSettings.TASKCAT_BASE + "token";

    constructor(private http: Http) {
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
            .map((res) => {
                let data = res.json();
                if (data) {
                    this.loggedIn = true;
                }
                return data;
            })
            .catch((error) => {
                this.loggedIn = false;
                let errorMsg = error.message || 'Server error';
                console.error(errorMsg);
                return Observable.throw(errorMsg);
            });
    }

    logout() {
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}