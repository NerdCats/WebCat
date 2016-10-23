import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

import { OrderModel, OrderCartModel, PackageListModel } from '../../shared/model/order-model'
import { OrderCartService } from '../../shared/order-cart.service'
import { CartBusService } from '../cart-bus.service';
import { LoginService } from '../../account/login/login.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'cart-icon',
    templateUrl: 'app/cart/cart-icon/cart-icon.component.html',
    styleUrls: ['app/cart/cart-icon/cart-icon.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [OrderCartService, LoginService]
})

export class CartIconComponent implements OnInit{
    numberOfItems: number = 0;
    packageListHasItem = false;
    orderCart: OrderModel;
    cartNumberCss: string = "no-item";


    constructor(private cartBusService: CartBusService,
                private router: Router,
                private orderCartService: OrderCartService,
                private loginService: LoginService){
            this.cartBusService.cartNumberChangeAnnounced$.subscribe(newCartNumber => {
                this.update();
                console.log("cart icon updated " + newCartNumber);
            });
    }

    ngOnInit(){
        this.update();
        this.orderCart = this.orderCartService.getOrderCart();
    }

    public update(){
        this.orderCart = this.orderCartService.getOrderCart();
        console.log(this.orderCart.OrderCart.PackageList);
        this.numberOfItems = this.orderCartService.totalQuantity();
        this.packageListHasItem = this.orderCartService.hasPackageListItem();
        if(this.numberOfItems > 0)
            this.cartNumberCss = "has-item";
        else this.cartNumberCss = "";
        console.log(this.orderCart);
    }

    itemChanged(value){
        this.orderCartService.save(this.orderCart);
        this.update();
    }

    removeItem(index: number) {
        // let _orderCart: OrderCartModel = new OrderCartModel();
        // _orderCart.PackageList = [];
        // for(let i = 0; i < this.orderCart.OrderCart.PackageList.length; i++){
        //     if(i !== index){
        //         _orderCart.PackageList.push(this.orderCart.OrderCart.PackageList[i]);
        //         console.log("added");

        //     }
        // }
        this.orderCart.OrderCart.PackageList.splice(index, 1);
        console.log(this.orderCart.OrderCart.PackageList);
        // this.orderCart.OrderCart = _orderCart;
        this.orderCartService.save(this.orderCart);
        this.update();
    }

    clearCustomOrder(){
        this.orderCart.Description = '';
        this.orderCartService.save(this.orderCart);
        this.update();
    }


    checkOut(){
        this.orderCartService.save(this.orderCart);
        if(this.loginService.isLoggedIn) {
            this.router.navigateByUrl("/checkout");
            console.log("checkout");

        } else {
            alert("Please log in first!");
        }
        this.closeShoppingCartModal();
    }


    @ViewChild('shoppingCart')
    shoppingCart: ModalComponent;
    openShoppingCartModal(){
        this.update();
        this.shoppingCart.open();
    }

    closeShoppingCartModal(){
        this.shoppingCart.close();
    }


}