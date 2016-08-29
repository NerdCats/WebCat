import { Component } from '@angular/core';
import { OrderCartService } from '../../shared/order-cart.service';
import { CheckOutService } from './check-out.service';
import { LoginService } from '../../account/login/login.service';
import { OrderService } from '../../dashboard/order/order.service';
import { OrderModel, PackageListModel } from "../../shared/model/order-model";

@Component({
    selector: 'check-out',
    templateUrl: 'app/cart/check-out/check-out.component.html',
    styleUrls: ['app/cart/check-out/check-out.component.css'],
    providers: [OrderCartService, CheckOutService, LoginService, OrderService]
})


export class CheckOutComponent {

    orderCart: OrderModel;

    constructor(private orderCartService: OrderCartService,
                private checkOutService: CheckOutService){
        this.orderCart = orderCartService.getOrderCart();
    }

    confirmOrder(){
        console.log(this.orderCart);
        this.checkOutService.createOrder(this.orderCart);
    }
}