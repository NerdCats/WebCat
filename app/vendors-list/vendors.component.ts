import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { Vendor, Item }           from '../shared/model/vendor';
import { VendorService }    from './vendor.service';
import { CartBusService } from '../cart/cart-bus.service';
import { CartSidebarComponent } from '../cart/cart-sidebar/cart-sidebar.component';
import { ProgressBubbleComponent } from './../common/progress-bubble/progress-bubble.component'
import { ComponentServiceStatus } from './../shared/component-service-status';
@Component({
    selector: 'vendors-dashboard',
    templateUrl: 'app/vendors-list/vendors.component.html',
    styleUrls: ['app/vendors-list/vendors.component.css'],
    providers: [VendorService, CartBusService],
    directives: [ProgressBubbleComponent, CartSidebarComponent]
})

export class VendorsComponent implements OnInit {
    flag = 0;
    vendors: Vendor[] = [];
    area:string = "";
    status: ComponentServiceStatus;
    constructor(private vendorService: VendorService,
                private router: Router,
                private routeParams: RouteParams) {  }

    ngOnInit() {
        this.status = "IN_PROGRESS";
        this.area = this.routeParams.get("area");
        this.vendorService.getVendors(this.area)
            .subscribe(res => {
                this.vendors = res;
                this.vendors.reverse();

                this.status = "SUCCESSFUL";

            }, error => {

            })
    }

    goToVendorMenuPage(vendorName: string){
        this.router.navigateByUrl("/vendors/" + this.area + "/" + vendorName);
    }

    getTileClass(i) {
        if (i % 5 == 0) {
            // return 'big-module';
            return "col-xs-8 col-md-8 col-sm-8 col-lg-8 big-module";
        }
        else {
            // return 'module';
            return "col-xs-4 col-md-4 col-sm-4 col-lg-4 module";
        }
    }
}
