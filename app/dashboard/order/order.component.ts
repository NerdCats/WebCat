import { Component, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from '../../shared/local-storage'
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';



import { LocalityService } from '../../shared/app-locality.service';
import { OrderModel, OrderCartModel, PackageListModel, JobTaskETAPreferenceModel, DeliveryOrder, ClassifiedDeliveryOrder } from '../../shared/model/order-model';
import { OrderType } from '../../shared/model/order-type';
import { OrderService } from './order.service';
import { DashboardBusService } from  '../dashboard-bus.service';


@Component({
    selector: 'order',
    templateUrl: 'app/dashboard/order/order.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent, FORM_DIRECTIVES, CORE_DIRECTIVES,TimepickerComponent, DATEPICKER_DIRECTIVES],
    providers: [OrderService, LocalStorage, LocalityService],
    styleUrls: ['app/dashboard/order/order.component.css']
})

export class OrderComponent {
    public orderModel: OrderModel;
    public packageListItem: PackageListModel;
    public isUpdating: boolean;
    public orderCreationStatus: string = 'PENDING';

    public orderResponseMessage: string = "";
    public areas: Array<string>;
    public itemAddOrUpdateText: string = "Add";
    public formTitle:string = "Create your Delivery Order";
    public submittedJobId: string;

    public pickupTime: Date; //= new Date();
    public deliveryTime: Date;


    constructor(private formBuilder: FormBuilder,
        private orderService: OrderService,
        private router: Router,
        private _localStorage: LocalStorage,
        private busService: DashboardBusService,
        private localityService: LocalityService) {
        this.busService.annouceSectionChange("New Order");
        this.initiateOrderModel(OrderType.DeliveryOrderType);
        this.isUpdating = false;
        this.areas = this.localityService.getLocalities();
    }


    onSubmit() {
        this.orderCreationStatus = 'IN_PROGRESS';
        this.processJobTaskPreferrenceETA();
        this.orderService.createOrder(this.orderModel)
            .subscribe((result) => {
                let job = JSON.parse(result._body);
                this.submittedJobId = job.HRID;
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

    onTypeChange(newValue){
        console.log(newValue);
    }

    processJobTaskPreferrenceETA(){
        if(this.orderModel.JobTaskETAPreference != [] && this.processJobTaskPreferrenceETA.length != 0){
            this.orderModel.JobTaskETAPreference = null;
        }
        if(this.pickupTime!=null || this.deliveryTime!= null){
            this.orderModel.JobTaskETAPreference = [];
            if(this.pickupTime!= null) {
                let pickupETA = new JobTaskETAPreferenceModel("PackagePickUp", this.pickupTime);
                this.orderModel.JobTaskETAPreference.push(pickupETA);
            }
            if(this.deliveryTime!= null) {
                let deliveryETA = new JobTaskETAPreferenceModel("Delivery", this.deliveryTime);
                this.orderModel.JobTaskETAPreference.push(deliveryETA);
            }
        }
    }

    goToTrackingPage(){
        this.router.navigateByUrl("/track/" + this.submittedJobId);
    }

    addOrUpdateItem() {
        if (this.isUpdating) {
            this.isUpdating = !this.isUpdating;
        } else {
            this.orderModel.OrderCart.PackageList.push(this.packageListItem);
        }
        this.packageListItem = new PackageListModel();
        this.close();
    }

    initiateOrderModel(orderType: string) {
        switch(orderType){
            case OrderType.DeliveryOrderType:
                this.orderModel = new DeliveryOrder();
                this.orderModel.Type = OrderType.DeliveryOrderType;
                break;
            case OrderType.ClassifiedDeliveryOrderType:
                this.orderModel = new ClassifiedDeliveryOrder();
                break;
            default:
                this.orderModel = new OrderModel();
        }



        this.orderModel.PayloadType = "default";

        this.orderModel.OrderCart.PackageList = [];
        this.orderModel.UserId = JSON.parse(this._localStorage.get('auth_token')).userId;
        this.packageListItem = new PackageListModel();
    }

    removeItem(index: number) {
        this.orderModel.OrderCart.PackageList.splice(index);
    }

    editItem(item: PackageListModel) {
        this.itemAddOrUpdateText = "Update";
        this.isUpdating = true;
        this.packageListItem = item;
        this.modal.open();
    }

    addItem() {
        this.itemAddOrUpdateText = "Add";
        this.open();
    }

    cancelModal() {
        this.packageListItem = new PackageListModel();
        this.close();
    }

    pickupDateChanged(){
        console.log(this.pickupTime)
        console.log("ami ekta modon");

    }

    @ViewChild('pickupTimeModal')
    pickupTimeModal: ModalComponent;
    openPickupTimeModal(){
        this.pickupTimeModal.open();
    }
    closePickupTimeModal(){
        this.pickupTimeModal.close();
    }
    clearPickupTime(){
        this.pickupTime = null;
        this.closePickupTimeModal();
    }

    @ViewChild('deliveryTimeModal')
    deliveryTimeModal: ModalComponent;
    openDeliveryTimeModal(){
        this.deliveryTimeModal.open();
    }
    closeDeliveryTimeModal(){
        this.deliveryTimeModal.close();
    }
    clearDeliveryTime(){
        this.deliveryTime = null;
        this.closeDeliveryTimeModal();
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

    resetForm() {
        this.initiateOrderModel();
        // this.router.navigate(["Job"])
    }
}