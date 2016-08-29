import { Injectable } from '@angular/core';
import { OrderService } from '../../dashboard/order/order.service';
import { OrderModel } from '../../shared/model/order-model';

@Injectable()
export class CheckOutService{
    constructor(private _orderService: OrderService){

    }

    public createOrder(cartOrder: OrderModel){

        this._orderService.createOrder(cartOrder)
        .subscribe((result)=>{
            console.log(result);

            // let job = JSON.parse(result.text)
        },
        (error) => {
            console.log(error);
    });

    }
}