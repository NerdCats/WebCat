import { Component, OnInit } from '@angular/core';

import { Vendor }           from '../shared/model/vendor';
import { VendorService }    from './vendor.service';

@Component({
    selector: 'vendors-dashboard',
    templateUrl: 'app/vendors-list/vendors-dashboard.component.html'
})

export class VendorsDashboardComponent implements OnInit {
    vendors: Vendor[] = [];

    constructor(private vendorService: VendorService) {  }

    ngOnInit() {
        this.vendorService.getVendors()
            .then(vendors => this.vendors = vendors);
    }
 }