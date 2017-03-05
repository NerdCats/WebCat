import { Injectable } from '@angular/core';
import { Vendor } from '.././shared/model/vendor';
import { MockVendors } from '.././shared/mock-vendors';
import { AppSettings } from '../shared/app.settings'

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class VendorMenuService {

    selectedVendor:Vendor = new Vendor();
    constructor(private http: Http) {}
    getVendorDetails(vendorName: string){
        return this.http.get(AppSettings.PRODUCT_BASE + "api/store?storename=" + vendorName)
            .map((res: Response)=> {
                if(res.json().store){
                    this.selectedVendor = res.json().store;
                }
                return this.selectedVendor;
            })
            .catch(error=>{
                return Observable.throw(error);
            })
    }
}