import { Component, ViewChild} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/components/typeahead';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { WrapHeaderService } from './wrapHeader.service';
import { LoginService } from '../account/login/login.service';
import { CartBusService } from '../cart/cart-bus.service';
import { CartIconComponent } from '../cart/cart-icon/cart-icon.component';
@Component({
    selector: 'wrap-header',
    templateUrl: 'app/wrapHeader/wrapHeader.component.html',
    styleUrls: ['app/wrapHeader/wrapHeader.component.css'],
    directives: [MODAL_DIRECTIVES, ROUTER_DIRECTIVES, TYPEAHEAD_DIRECTIVES, CartIconComponent],
    providers: [WrapHeaderService, LoginService, CartBusService]
})

export class WrapHeaderComponent {
    public selectedArea: string = "";
    public selectedItem: string;

    public vendors: any[] = this.wrapHeaderService.WrapHeaderDetails.featuredVendors;
    public areas:string [] = this.wrapHeaderService.WrapHeaderDetails.areas;

    public items:string[] = this.wrapHeaderService.WrapHeaderDetails.items;

    constructor(private router: Router, private wrapHeaderService: WrapHeaderService,
                private loginService: LoginService){}



    gotoSearchResultPage(e) {
        if(!this.selectedItem){
            this.router.navigateByUrl("/vendors/" + this.selectedArea);
        } else {
            this.router.navigateByUrl("/search/" + this.selectedArea + "/" + this.selectedItem);
        }
    }

    gotoCustomOrder(){
        if(this.loginService.isLoggedIn){
            this.router.navigateByUrl("/dashboard/order");
        } else {
            this.openloginAlertModal();
        }

    }

    public typeaheadOnSelect(e: any) {
        console.log('Selected item: ', e.item);
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
