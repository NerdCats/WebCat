import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { Vendor, Item }           from '../shared/model/vendor';
import { VendorService }    from './vendor.service';
import { CartBusService } from '../cart/cart-bus.service';
import { CartIconComponent } from '../cart/cart-icon/cart-icon.component';
import { CartSidebarComponent } from '../cart/cart-sidebar/cart-sidebar.component';
import { ProgressBubbleComponent } from './../common/progress-bubble/progress-bubble.component'
import { ComponentServiceStatus } from './../shared/component-service-status';
@Component({
    selector: 'vendors-dashboard',
    templateUrl: 'app/vendors-list/vendors.component.html',
    styleUrls: ['app/vendors-list/vendors.component.css'],
    providers: [VendorService, CartBusService],
    directives: [ProgressBubbleComponent, CartIconComponent, CartSidebarComponent]
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

                this.status = "SUCCESSFUL";

            }, error => {

            })
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

    getImage(index: number){
        let images = ['http://i.imgur.com/9Cfolu9.jpg',
                        'http://imgur.com/DvmzsbV.jpg',
                        'http://imgur.com/DvmzsbV.jpg',
                        'http://i.imgur.com/iW1euxZ.jpg',
                        'http://i.imgur.com/C1fbSZc.jpg',
                        'http://i.imgur.com/1LGNGv8.jpg',
                        'http://i.imgur.com/OrYcw8i.jpg',
                        'http://i.imgur.com/5ex18sL.jpg',
                        'http://i.imgur.com/DvmzsbV.jpg',
                        'http://i.imgur.com/DvmzsbV.jpg',
                        'http://i.imgur.com/DvmzsbV.jpg',
                        'http://i.imgur.com/DvmzsbV.jpg'
                    ]
        if(index === 1) return images[11];
        if(index%2 === 0) return images[0];
        if(index%3 === 0) return images[1];
        if(index%5 === 0) return images[2];
        if(index%7 === 0) return images[3];
        if(index%11 === 0) return images[4];
        if(index%13 === 0) return images[5];
        if(index%17 === 0) return images[6];
        if(index%23 === 0) return images[7];
        if(index%29 === 0) return images[8];
        if(index%31 === 0) return images[9];
        if(index%37 === 0) return images[10];

    }
}
