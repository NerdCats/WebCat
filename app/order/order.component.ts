import { Component, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router-deprecated';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { OrderModel, OrderCartModel, PackageListModel } from '../shared/order-model';
import { OrderService } from './order.service';


@Component({
    selector: 'order',
    templateUrl: 'app/order/order.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent, FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [OrderService],
    styleUrls: ['app/order/order.component.css']
})

export class OrderComponent{
    public orderForm: ControlGroup;
    public orderModel: OrderModel;
    public packageListItem: PackageListModel;
    public isUpdating: boolean;

    public orderSubmittedMessage: string = "";

    constructor(private formBuilder: FormBuilder,
        private orderService: OrderService,
        private router: Router) {
        this.initiateForm();
        this.orderModel = new OrderModel();
        this.orderModel.Type = "Delivery";
        this.orderModel.PayloadType = "default";

        this.orderModel.OrderCart.PackageList = [];
        this.orderModel.OrderCart.PackageList.push(new PackageListModel());
        //FIXME: this value will be replaced by the userId of the currently logged in user's ID
        this.orderModel.UserId = "575f9647b477aa9971d8041a";
        this.packageListItem = new PackageListModel();
        this.isUpdating = false;
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

    addMoreItem(){
        if (this.isUpdating) {
            this.isUpdating = !this.isUpdating;
        } else {
            this.orderModel.OrderCart.PackageList.push(this.packageListItem);
        }
        this.packageListItem = new PackageListModel();
        this.close();
    }

    removeItem(index: number){
        this.orderModel.OrderCart.PackageList.splice(index);
        console.log(index);
    }

    editItem(item: PackageListModel){
        this.isUpdating = true;
        this.packageListItem = item;
        this.open();
    }

    @ViewChild('itemModal')
    modal: ModalComponent;

    close() {
        this.modal.close();
    }

    open() {
        this.modal.open();
    }

    onModalClosed() {

    }

    onModalDismissed() {

    }
}