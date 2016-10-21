import { Component, OnInit } from '@angular/core';

import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { Vendor, Item }           from '../shared/model/vendor';
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
    area:string = "";
    constructor(private vendorService: VendorService,
                private router: Router,
                private routeParams: RouteParams) {  }

    ngOnInit() {
        this.vendors = this.vendorService.getVendors();
        this.area = this.routeParams.get("area");
    }

    goToVendorMenuPage(vendorName: string){
        this.router.navigateByUrl("/vendors/" + this.area + "/" + vendorName);
    }

    getTileClass(i) {
        if (i % 3 == 0) {
            // return 'big-module';
            return "col-xs-12 col-md-12 col-sm-12 col-lg-12 big-module";
        }
        else {
            // return 'module';
            return "col-xs-6 col-md-6 col-sm-6 col-lg-6 module";
        }
    }
}
