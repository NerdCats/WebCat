import { Component, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from '../shared/local-storage'
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { LocalityService } from '../shared/app-locality.service';
import { OrderModel, OrderCartModel, PackageListModel } from '../shared/model/order-model';
import { OrderService } from './order.service';


@Component({
    selector: 'order',
    templateUrl: 'app/order/order.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent, FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [OrderService, LocalStorage, LocalityService],
    styleUrls: ['app/order/order.component.css']
})

export class OrderComponent{
    public orderModel: OrderModel;
    public packageListItem: PackageListModel;
    public isUpdating: boolean;
    public orderCreationStatus: string = 'PENDING';

    public orderResponseMessage: string = "";
    public areas: Array<string>;
    public itemAddOrUpdateText: string = "Add";
    public formTitle:string = "Create your Delivery Order";

    constructor(private formBuilder: FormBuilder,
        private orderService: OrderService,
        private router: Router,
        private _localStorage: LocalStorage,
        private localityService: LocalityService) {
        this.initiateOrderModel();
        this.isUpdating = false;
        this.areas = this.localityService.getLocalities();
    }


    onSubmit(){
        this.orderCreationStatus = 'IN_PROGRESS';
        this.orderService.createOrder(this.orderModel)
            .subscribe((result)=>{
                this.orderCreationStatus = 'SUCCESS';
                this.orderModel = new OrderModel();
                this.resetForm();
            },
            (error) => {
                this.orderResponseMessage = error;
                console.log(error);
                this.orderCreationStatus = 'FAILED';
            });

    }

    addOrUpdateItem(){
        if (this.isUpdating) {
            this.isUpdating = !this.isUpdating;
        } else {
            this.orderModel.OrderCart.PackageList.push(this.packageListItem);
        }
        this.packageListItem = new PackageListModel();
        this.close();
    }

    initiateOrderModel(){
        this.orderModel = new OrderModel();
        this.orderModel.Type = "Delivery";
        this.orderModel.PayloadType = "default";

        this.orderModel.OrderCart.PackageList = [];
        this.orderModel.UserId = JSON.parse(this._localStorage.get('auth_token')).userId;
        this.packageListItem = new PackageListModel();
    }

    removeItem(index: number){
        this.orderModel.OrderCart.PackageList.splice(index);
        console.log(index);
    }

    editItem(item: PackageListModel){
        this.itemAddOrUpdateText = "Update";
        this.isUpdating = true;
        this.packageListItem = item;
        this.modal.open();
    }

    addItem(){
        this.itemAddOrUpdateText = "Add";
        this.open();
    }

    cancelModal(){
        this.packageListItem = new PackageListModel();
        this.close();
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

    resetForm(){
        this.initiateOrderModel();
        // this.router.navigate(["Job"])
    }
}