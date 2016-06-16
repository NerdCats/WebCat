import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {ROUTER_PROVIDERS, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LocalStorage} from '../../shared/local-storage'

@Injectable()
export class SecureHttp extends Http {
    private _authToken: string;
    /**
     * SecureHttp Constructor
     */
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router, private _localStorage: LocalStorage) {
        super(backend, defaultOptions);
        this._authToken = this._localStorage.get('auth_token');
        if (!this._authToken) {
            throw new Error("Auth token is empty");

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
        return this._intercept(super.delete(url, options));
    }


    private _getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append("Authorization", "bearer " + this._authToken);

        return options;
    }

    // INFO: Im really not sure about this, I dont like the fact it tries to move the user to a
    // defined place in router in this class hurting the possible portability of the class
    private _intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status == 401) {
                this._router.navigate(['/login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }
}