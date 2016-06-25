import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { LOCAL_STORAGE_PROVIDERS } from './shared/local-storage';
import { HTTP_PROVIDERS } from '@angular/http';
import { SECURE_HTTP_PROVIDERS} from './shared/secure-http';
import { Router, ROUTER_PROVIDERS} from '@angular/router-deprecated';


import { GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig } from 'angular2-google-maps/core/index';
import 'rxjs/add/operator/catch';

// INFO: Need to use a proper logging module here
bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: PathLocationStrategy }),
    LOCAL_STORAGE_PROVIDERS,
    HTTP_PROVIDERS,
    SECURE_HTTP_PROVIDERS,
    GOOGLE_MAPS_PROVIDERS,
    provideLazyMapsAPILoaderConfig({ apiKey: 'AIzaSyCKMIEYdB0YPJkDr89n0WuaG3qQDjE9ndY' })])
    .catch(err => console.error("Bootstrapping Failed " + err));
