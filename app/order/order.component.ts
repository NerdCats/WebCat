import { Component } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router-deprecated';
import { OrderModel } from '../shared/order-model';
import { OrderService } from './order.service';


@Component({
    selector: 'order',
    templateUrl: 'app/order/order.component.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [OrderService]
})

export class OrderComponent{
    public orderForm: ControlGroup;
    public orderModel: OrderModel;

    public orderSubmittedMessage: string = "";

    constructor(private formBuilder: FormBuilder,
        private orderService: OrderService,
        private router: Router) {
        this.initiateForm();
        this.orderModel = new OrderModel();
    }

    initiateForm(){
        let orderControls = {
            "pickupAddress": ['', Validators.required],
            "pickupArea": [''],
            "deliveryAddress": ['', Validators.required],
            "deliveryArea": [''],
            "packageDescription": ['', Validators.required],
            "noteToDeliveryMan": [''],
            "paymentMethod": ['CashOnDelivery', Validators.required]
        };
        this.orderForm = this.formBuilder.group(orderControls);
    }

    onSubmit(){
        console.log(JSON.stringify(this.orderModel));
    }
}