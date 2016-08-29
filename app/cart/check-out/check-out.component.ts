import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { ControlGroup, Validators, FormBuilder } from '@angular/common';
import { OrderCartService } from '../../shared/order-cart.service';
import { LocalStorage } from '../../shared/local-storage';
import { OrderService } from '../../dashboard/order/order.service';
import { OrderModel, PackageListModel } from '../../shared/model/order-model';
import { AppSettings } from '../../shared/app.settings';

@Component({
    selector: 'check-out',
    templateUrl: 'app/cart/check-out/check-out.component.html',
    styleUrls: ['app/cart/check-out/check-out.component.css'],
    providers: [OrderCartService, LocalStorage, OrderService]
})


export class CheckOutComponent {

    orderCart: OrderModel;
    userId: string;
    errorMessage: string;
    orderSubmission: string;
    checkOutForm: ControlGroup;

    constructor(private _router: Router,
                private formBuilder: FormBuilder,
                private _orderCartService: OrderCartService,
                private _orderService: OrderService,
                private _localStorage: LocalStorage){
        this.initiateForm();
        this.orderSubmission = 'PENDING';
        this.orderCart = _orderCartService.getOrderCart();
        this.orderCart.UserId = _localStorage.getObject(AppSettings.AUTH_TOKEN_KEY).userId;
    }

    initiateForm() {
        let checkOutControls = {
            "deliveryAddress": ['', Validators.required],
            "orderType": ['', Validators.required]
        };
        this.checkOutForm = this.formBuilder.group(checkOutControls);
    }

    confirmOrder(){
        console.log(this.orderCart);
        // FIXME: for now
        this.orderCart.From.AddressLine1 = "GObd";
        this.orderCart.Type = "Delivery";
        this.orderSubmission = 'IN_PROGRESS';
        this.orderCart.OrderCart.SubTotal = 0;
        this.orderCart.OrderCart.TotalToPay = 0;
        this.orderCart.OrderCart.PackageList.forEach(item => {
            item.Total = 0;
        })
        this._orderService.createOrder(this.orderCart)

            .subscribe((result)=> {
                let job = JSON.parse(result._body);
                this.orderSubmission = 'COMPLETED';
                this._orderCartService.resetOrderCart();
                this._router.navigateByUrl("/track/" + job.HRID);
            },
            (error)=> {
                this.orderSubmission = 'FAILED';
                this.errorMessage = error;
            });
    }
}