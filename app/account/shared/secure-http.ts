import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {ROUTER_PROVIDERS, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

export class SecureHttp extends Http {
    /**
     * SecureHttp Constructor
     */
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

        return this.intercept(super.request(url, options));
    }

    // INFO: Im really not sure about this, I dont like the fact it tries to move the user to a
    // defined place in router in this class hurting the possible portability of the class
    intercept(observable: Observable<Response>): Observable<Response> {
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