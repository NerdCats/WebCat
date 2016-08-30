import {Injectable} from '@angular/core';
import {Http, Request, XHRBackend, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {LocalStorage, LOCAL_STORAGE_PROVIDERS} from '../shared/local-storage';
import { AppSettings } from '../shared/app.settings';
import { provide } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { LoginService } from '../account/login/login.service';

@Injectable()
export class SecureHttp extends Http {
    private _authToken: string;
    private localStorage: LocalStorage;
    /**
     * SecureHttp Constructor
     */
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router, _localStorage: LocalStorage, private _login: LoginService) {
        super(backend, defaultOptions);
        this.localStorage = _localStorage;
        this._authToken = this.localStorage.getObject(AppSettings.AUTH_TOKEN_KEY);
        if (!this._authToken) {
            // FIXME: Since users will be able to browse vendors without logging in
            // Lets not throw this error now!
            // throw new Error("Invalid/blank auth data, Fatal Error");
            // throw new Error("Auth token is empty");
        }
    }

    secureRequest(url: string | Request, options?: RequestOptionsArgs) {
        return this._intercept(super.request(url, this._getRequestOptionArgs(options)));
    }

    securePost(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._intercept(super.post(url, body, this._getRequestOptionArgs(options)));
    }

    securePut(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._intercept(super.put(url, body, this._getRequestOptionArgs(options)));
    }

    secureDelete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._intercept(super.delete(url, this._getRequestOptionArgs(options)));
    }

    secureGet(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._intercept(super.get(url, this._getRequestOptionArgs(options)));
    }


    private _getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append("Authorization", "bearer " + this._authToken["access_token"]);

        return options;
    }

    // INFO: Im really not sure about this, I dont like the fact it tries to move the user to a
    // defined place in router in this class hurting the possible portability of the class
    private _intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status == 401) {
                this._router.navigate(['/Home']);
                // FIXME:
                // We should really use the refresh token and get another token
                // due to deadline, had to do this blund hack, will come back to this
                this._login.logout();
                window.location.reload();
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }
}

export const SECURE_HTTP_PROVIDERS: any[] = [
    provide(SecureHttp, {
        useFactory: (connBackend: XHRBackend, requestOptions: RequestOptions, router: Router, localStorage: LocalStorage, login: LoginService) => new SecureHttp(connBackend, requestOptions, router, localStorage, login),
        deps: [XHRBackend, RequestOptions, Router, LocalStorage, LoginService]
    })
];