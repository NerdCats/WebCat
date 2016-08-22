import { Component, OnInit } from '@angular/core';

import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Vendor }           from '../shared/model/vendor';
import { VendorService }    from './vendor.service';

@Component({
    selector: 'vendors-dashboard',
    templateUrl: 'app/vendors-list/vendors.component.html',
    styleUrls: ['app/vendors-list/vendors.component.css']
})

export class VendorsComponent implements OnInit {
    flag = 0;
    vendors: Vendor[] = [];

    constructor(private vendorService: VendorService,
                private router: Router) {  }

    ngOnInit() {
        this.vendorService.getVendors()
            .then(vendors => this.vendors = vendors);
    }

    goToVendorMenuPage(vendorName: string){
         this.router.navigateByUrl("/vendors/" + vendorName);
    }

    getTileClass() {
        if (this.flag == 1 || this.flag == 2) {
            this.setFlag();
            return 'module';
        }
        else {
            this.setFlag();
            return 'big-module';
        }
    }

    setFlag() {
        this.flag++;
        this.flag %= 3;
    }
 }