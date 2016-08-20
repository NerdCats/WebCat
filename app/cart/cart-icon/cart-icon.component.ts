import { Component, OnInit } from '@angular/core';
import { OrderCart } from '../../shared/model/order-cart'

import { Observable } from 'rxjs';


@Component({
    selector: 'cart-icon',
    templateUrl: 'app/cart/cart-icon/cart-icon.component.html',
    styleUrls: ['app/cart/cart-icon/cart-icon.component.css']
})


export class CartIconComponent implements OnInit{
    numberOfItems: number = 0;

    ngOnInit(){
        this.update();
    }

   public update(){
        if(OrderCart.getOrderCart().OrderCart.PackageList){
            this.numberOfItems = 0;
            OrderCart.getOrderCart().OrderCart.PackageList.forEach(item => {
                this.numberOfItems += item.Quantity;
            });

            if(OrderCart.getOrderCart().Description){
                this.numberOfItems += 1;
            }
        }
    }


}