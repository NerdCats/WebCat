import { Component, OnInit } from "@angular/core";
import { VendorDetailsService } from "./vendor-details.service";


@Component({
    selector: 'vendor-details',
    templateUrl: 'app/vendor-details/vendor-details.component.html',
    styleUrls: ['app/vendor-details/vendor-details.component.css'],
    providers: [VendorDetailsService]
})



export class VendorDetailsComponent implements OnInit {
    vendor: any;

    ngOnInit(){
        this.vendor = this.vendorDetailsService.vendorDetails;
    }

    constructor(private vendorDetailsService: VendorDetailsService){

    }

}