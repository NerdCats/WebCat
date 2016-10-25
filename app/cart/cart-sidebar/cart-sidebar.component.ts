import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

import { OrderModel, OrderCartModel, PackageListModel } from '../../shared/model/order-model'
import { OrderCartService } from '../../shared/order-cart.service'
import { CartBusService } from '../cart-bus.service';
import { LoginService } from '../../account/login/login.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'cart-sidebar',
    templateUrl: 'app/cart/cart-sidebar/cart-sidebar.component.html',
    styleUrls: ['app/cart/cart-sidebar/cart-sidebar.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [OrderCartService, LoginService]
})

export class CartSidebarComponent implements OnInit {
    numberOfItems: number = 0;
    packageListHasItem = false;
    orderCart: OrderModel;
    cartNumberCss: string = "no-item";
    isLoggedIn: boolean = false;


    constructor(private cartBusService: CartBusService,
                private router: Router,
                private orderCartService: OrderCartService,
                private loginService: LoginService){
            this.cartBusService.cartNumberChangeAnnounced$.subscribe(newCartNumber => {
                this.update();
            });
            this.isLoggedIn = this.loginService.isLoggedIn;
    }

    ngOnInit(){
        this.update();
        this.orderCart = this.orderCartService.getOrderCart();
    }

    public update(){
        this.orderCart = this.orderCartService.getOrderCart();
        this.numberOfItems = this.orderCartService.totalQuantity();
        this.packageListHasItem = this.orderCartService.hasPackageListItem();
        if(this.numberOfItems > 0)
            this.cartNumberCss = "has-item";
        else this.cartNumberCss = "";
    }

    itemChanged(value){
        this.orderCartService.save(this.orderCart);
        this.update();
    }

    removeItem(index: number) {
        this.orderCart.OrderCart.PackageList.splice(index, 1);
        this.orderCartService.save(this.orderCart);
        this.update();
    }

    clearCustomOrder(){
        this.orderCart.Description = "";
        this.orderCartService.save(this.orderCart);
        this.update();
    }


    notLoginAlert(){
        this.orderCartService.save(this.orderCart);
        alert("Please log in first!");
    }
}