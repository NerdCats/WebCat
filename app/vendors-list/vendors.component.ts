import { Component, OnInit } from '@angular/core';

import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Vendor }           from '../shared/model/vendor';
import { VendorService }    from './vendor.service';

@Component({
    selector: 'vendors-dashboard',
    templateUrl: 'app/vendors-list/vendors.component.html',
    styleUrls: ['app/vendors-list/vendors.component.css'],
    providers: [VendorService]
})

export class VendorsComponent implements OnInit {
    flag = 0;
    vendors: Vendor[] = [];

    constructor(private vendorService: VendorService,
                private router: Router) {  }

    ngOnInit() {
        this.vendors = this.vendorService.getVendors();
    }

    goToVendorMenuPage(vendorName: string){
         this.router.navigateByUrl("/vendors/" + vendorName);
    }

    getTileClass(i) {
        if (i % 3 == 0) {
            // return 'big-module';
            return "col-md-12 big-module";
        }
        else {
            // return 'module';
            return "col-md-6 module";
        }
    }
}
