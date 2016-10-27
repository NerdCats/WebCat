import { Component, ViewChild, OnInit } from '@angular/core';
import { LoginService } from '../account/login/login.service';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { VendorsFeaturedService } from './vendors-featured.service';

@Component({
    selector: 'vendors-featured',
    templateUrl: 'app/vendors-featured/vendors-featured.component.html',
    styleUrls: ['app/vendors-featured/vendors-featured.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [LoginService, VendorsFeaturedService]
})

export class VendorsFeaturedComponent implements OnInit{

    vendors: any[] = [
            {
                "Name": "North End Coffee Roasters",
                "Address": "Banani",
                "Image": "http://i.imgur.com/9Cfolu9.jpg",
                "Area": "Banani",
                "Category": "Coffee"
            },
            {
                "Name": "Dhaka Dough",
                "Address": "Rampura",
                "Image": "http://i.imgur.com/lzBNSsW.png",
                "Area": "Banani",
                "Category": "Premium grocery"
            },
            {
                "Name": "Izumi",
                "Address": "Gulshan",
                "Image": "http://imgur.com/uPOpIzn.jpg",
                "Area": "Gulshan",
                "Category": "Breakfast, Lunch"
            },
            {
                "Name": "Medicine Mart",
                "Address": "Banani",
                "Image": "http://i.imgur.com/lyqS3A7.jpg",
                "Area": "Banani",
                "Category": "Medicine"
            },
            {
                "Name": "Pressto",
                "Address": "Gulshan 2",
                "Image": "http://i.imgur.com/a7t4aLX.gif",
                "Area": "Gulshan 2",
                "Category": "Daily Needs"
            },
            {
                "Name": "Döner and Gyros",
                "Address": "Banani",
                "Image": "http://imgur.com/hz5r6jW.jpg",
                "Area": "Banani",
                "Category": "Fresh fruits, vegetables"
            }
        ];

    ngOnInit(){
        // this.vendors = this.vendorsFeaturedService.featuredVendors;
    }
    constructor(private router: Router, private loginService: LoginService,
                private vendorsFeaturedService :VendorsFeaturedService){

                }

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