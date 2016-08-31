import { Injectable } from '@angular/core';
import { Vendor } from '.././shared/model/vendor';
import { MockVendors } from '.././shared/mock-vendors';

@Injectable()
export class VendorDetailsService {

    selectedVendor:Vendor;

    getVendorDetails(vendorName: string){
        console.log(vendorName);
        MockVendors.VENDORS.forEach(vendor => {
            if(vendor.username === vendorName)
            {
                this.selectedVendor = vendor;
            }
        })
        console.log(this.selectedVendor);


        return this.selectedVendor;
    }
}