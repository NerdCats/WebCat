import { Injectable } from '@angular/core';
import { Vendor } from '.././shared/model/vendor';
import { MockVendors } from '.././shared/mock-vendors';

import { SecureHttp } from '../shared/secure-http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class VendorDetailsService {

    selectedVendor:Vendor;
    constructor(private shttp: SecureHttp) {}
    getVendorDetails(vendorName: string){
        console.log(vendorName);
        // MockVendors.VENDORS.forEach(vendor => {
        //     if(vendor.username === vendorName)
        //     {
        //         this.selectedVendor = vendor;
        //     }
        // })
        // console.log(this.selectedVendor);


        // return this.selectedVendor;

        return this.shttp.secureGet("http://gobdsif.cloudapp.net/api/store?storename=" + vendorName)
            .map((res: Response)=> {
                return res.json().store;
            })
            .catch(error=>{
                return Observable.throw(error);
            })

    }
}