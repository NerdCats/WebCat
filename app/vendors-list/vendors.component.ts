import { Component, OnInit } from '@angular/core';

import { Vendor }           from '../shared/model/vendor';
import { VendorService }    from './vendor.service';

@Component({
    selector: 'vendors-dashboard',
    templateUrl: 'app/vendors-list/vendors.component.html',
    styleUrls: ['app/vendors-list/vendors.component.css']
})

export class VendorsComponent implements OnInit {
    vendors: Vendor[] = [];

    constructor(private vendorService: VendorService) {  }

    ngOnInit() {
        this.vendorService.getVendors()
            .then(vendors => this.vendors = vendors);
    }
 }