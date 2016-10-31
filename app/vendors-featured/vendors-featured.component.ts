import { Component, ViewChild, OnInit } from '@angular/core';
import { LoginService } from '../account/login/login.service';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { VendorMenuService } from '../vendor-menu/vendor-menu.service';
import { Vendor } from ".././shared/model/vendor";
@Component({
    selector: 'vendors-featured',
    templateUrl: 'app/vendors-featured/vendors-featured.component.html',
    styleUrls: ['app/vendors-featured/vendors-featured.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [LoginService, VendorMenuService]
})

export class VendorsFeaturedComponent implements OnInit{

    featuredVendors: Vendor[];
    featuredVendorsName: any[] = [
            "North End Coffee Roasters",
            "Dhaka Dough",
            "Izumi",
            "Medicine Mart",
            "Pressto",
            "Döner and Gyros"
        ];

    ngOnInit(){
        this.featuredVendors = [];
        this.featuredVendorsName.forEach(vendorName => {
            this.vendorMenuService.getVendorDetails(vendorName)
                .subscribe(store=>{
                    this.featuredVendors.push(store);
                }, error => {

                })
        })
    }

    constructor(private router: Router, private loginService: LoginService,
                private vendorMenuService :VendorMenuService){}

    gotoCustomOrder(){
        if(this.loginService.isLoggedIn){
            this.router.navigateByUrl("/dashboard/order");
        } else {
            this.openloginAlertModal();
        }

    }
    @ViewChild('loginAlert')
        loginAlert: ModalComponent;
        openloginAlertModal(){
            this.loginAlert.open();
        }

        closeloginAlertModal(){
            this.loginAlert.close();
        }
}