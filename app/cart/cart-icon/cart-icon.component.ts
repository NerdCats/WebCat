import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

import { OrderModel, OrderCartModel, PackageListModel } from '../../shared/model/order-model'
import { OrderCartService } from '../../shared/order-cart.service'
import { CartBusService } from '../cart-bus.service';
import { LoginService } from '../../account/login/login.service';

@Component({
    selector: 'cart-icon',
    templateUrl: 'app/cart/cart-icon/cart-icon.component.html',
    styleUrls: ['app/cart/cart-icon/cart-icon.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [CartBusService, OrderCartService, LoginService]
})

export class CartIconComponent implements OnInit{
    numberOfItems: number = 0;
    packageListHasItem = false;
    orderCart: OrderModel;
    cartNumberCss: string = "no-item";


    constructor(private _cartBusService: CartBusService,
                private _router: Router,
                private _orderCartService: OrderCartService,
                private _loginService: LoginService){
        this._cartBusService.cartNumberChangeAnnounced$.subscribe(newCartNumber => {
            this.update();
            console.log("cart icon updated " + newCartNumber);
        });
    }

    ngOnInit(){
        this.update();
        this.orderCart = this._orderCartService.getOrderCart();
    }

    public update(){
        this.numberOfItems = this._orderCartService.totalQuantity();
        this.packageListHasItem = this._orderCartService.hasPackageListItem();
        if(this.numberOfItems > 0)
            this.cartNumberCss = "has-item";
        else this.cartNumberCss = "";
        this.orderCart = this._orderCartService.getOrderCart();
        console.log(this.orderCart);
    }

    itemChanged(value){
        this._orderCartService.save(this.orderCart);
        this.update();
    }

    removeItem(index: number) {
        let _orderCart: OrderCartModel = new OrderCartModel();
        _orderCart.PackageList = [];
        for(let i = 0; i < this.orderCart.OrderCart.PackageList.length; i++){
            if(i !== index){
                _orderCart.PackageList.push(this.orderCart.OrderCart.PackageList[i]);
                console.log("added");

            }
        }

        this.orderCart.OrderCart = _orderCart;
        this._orderCartService.save(this.orderCart);
        this.update();
    }

    clearCustomOrder(){
        this.orderCart.Description = '';
        this._orderCartService.save(this.orderCart);
        this.update();
    }


    checkOut(){
        this._orderCartService.save(this.orderCart);
        if(this._loginService.isLoggedIn) {
            this._router.navigateByUrl("/checkout");
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