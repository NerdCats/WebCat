import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { LOCAL_STORAGE_PROVIDERS } from './shared/local-storage';
import { HTTP_PROVIDERS, Http, XHRBackend, RequestOptions } from '@angular/http';
import { provide } from '@angular/core';
import { ROUTER_PROVIDERS, Router } from '@angular/router';
import { SecureHttp } from './shared/secure-http';
import { LocalStorage } from './shared/local-storage';

// INFO: Need to use a proper logging module here
bootstrap(AppComponent, [
    LOCAL_STORAGE_PROVIDERS,
    HTTP_PROVIDERS,
    provide(SecureHttp, {
        useFactory: (connBackend: XHRBackend, requestOptions: RequestOptions, router: Router, localStorage: LocalStorage) => new SecureHttp(connBackend, requestOptions, router, localStorage),
        deps: [XHRBackend, RequestOptions, Router]
    })])
    .catch(err => console.log("Bootstrapping Failed " + err));
