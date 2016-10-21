import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { MockVendors } from '../shared/mock-vendors';
import { SecureHttp } from '../shared/secure-http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Vendor } from '.././shared/model/vendor';

@Injectable()
export class VendorService {
    vendors: Vendor[] = [];
    constructor(private shttp: SecureHttp) {}
    public getVendors(area: string) {
        // return MockVendors.VENDORS;
        return this.shttp.secureGet("http://gobdsif.cloudapp.net/api/store-search?area="+area)
            .map((res:Response)=>{
                if(res.json().data.length !== 0){
                    this.vendors = res.json().data;
                }
                return this.vendors;
            })
            .catch(error=>{
                return Observable.throw(error);
            })
    }
}