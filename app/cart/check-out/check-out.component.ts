import { Component } from '@angular/core';
import { OrderCartService } from '../../shared/order-cart.service';
import { OrderModel, PackageListModel } from "../../shared/model/order-model";
@Component({
    selector: 'check-out',
    templateUrl: 'app/cart/check-out/check-out.component.html',
    styleUrls: ['app/cart/check-out/check-out.component.css'],
    providers: [OrderCartService]
})


export class CheckOutComponent {

    orderCart: OrderModel;

    constructor(private orderCartService: OrderCartService){
        this.orderCart = orderCartService.getOrderCart();
    }




}