import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { OrderModel, PackageListModel } from '../../shared/model/order-model'
import { OrderCart } from '../../shared/model/order-cart'
import { CartBusService } from '../cart-bus.service';


@Component({
    selector: 'cart-icon',
    templateUrl: 'app/cart/cart-icon/cart-icon.component.html',
    styleUrls: ['app/cart/cart-icon/cart-icon.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [CartBusService]
})

export class CartIconComponent implements OnInit{
    numberOfItems: number = 0;
    orderCart: OrderModel;
    cartNumberCss: string = "no-item";


    constructor(private cartBusService: CartBusService){
        this.cartBusService.cartNumberChangeAnnounced$.subscribe(newCartNumber => {
            this.update();
            console.log("cart icon updated " + newCartNumber);
        });
    }

    ngOnInit(){
        this.orderCart = OrderCart.getOrderCart();
        this.update();
    }

    public update(){
        OrderCart.update();
        this.numberOfItems = OrderCart.totalQuantity();
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
        console.log(this.orderCart);

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