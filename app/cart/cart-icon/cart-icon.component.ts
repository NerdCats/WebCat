import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { OrderModel, PackageListModel } from '../../shared/model/order-model'
import { OrderCartService } from '../../shared/order-cart.service'
import { CartBusService } from '../cart-bus.service';


@Component({
    selector: 'cart-icon',
    templateUrl: 'app/cart/cart-icon/cart-icon.component.html',
    styleUrls: ['app/cart/cart-icon/cart-icon.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [CartBusService, OrderCartService]
})

export class CartIconComponent implements OnInit{
    numberOfItems: number = 0;
    orderCart: OrderModel;
    cartNumberCss: string = "no-item";


    constructor(private cartBusService: CartBusService,
                private router: Router,
                private orderCartService: OrderCartService){
        this.cartBusService.cartNumberChangeAnnounced$.subscribe(newCartNumber => {
            this.update();
            console.log("cart icon updated " + newCartNumber);
        });
    }

    ngOnInit(){
        this.orderCart = this.orderCartService.getOrderCart();
        this.update();
    }

    public update(){
        this.orderCartService.update();
        this.numberOfItems = this.orderCartService.totalQuantity();
        if(this.numberOfItems > 0)
            this.cartNumberCss = "has-item";
        else this.cartNumberCss = "";
    }

    itemChanged(value){
        this.update();
    }

    removeItem(index: number) {
        this.orderCart.OrderCart.PackageList.splice(index);
        this.update();
    }


    checkOut(){
        this.orderCartService.save(this.orderCart);
        this.closeShoppingCartModal();
        this.router.navigateByUrl("/checkout");
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