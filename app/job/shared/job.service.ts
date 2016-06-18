import { Injectable } from '@angular/core';
import { SecureHttp } from '../../shared/secure-http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppSettings } from '../../shared/app.settings';

@Injectable()
export class JobService {
    constructor(private shttp: Http) { }

    private jobUrl = AppSettings.TASKCAT_API_BASE + 'job';

    getHistory() {
        return this.shttp.get(this.jobUrl);
    }
}