import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppSettings } from '../../shared/app.settings';
import { LocalStorage } from '../../shared/local-storage';

@Injectable()
export class ReportService {

    constructor(private http: Http, private localStorage: LocalStorage){

    }

    getReport(startTime: string, endTime: string){
        let auth_token = JSON.parse(this.localStorage.get("auth_token"));
        console.log(auth_token);
        var url = AppSettings.SPYCAT_BASE + "/api/details?startdate="+startTime+
                                            "&enddate="+endTime+"&usertype=ENTERPRISE&"+
                                            "username=" + auth_token["userName"] +
                                            "&generateexcel=true";
        console.log(url);

        window.open(url, "_blank")
    }
}