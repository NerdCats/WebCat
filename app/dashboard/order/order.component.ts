import { Component, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from '../../shared/local-storage'
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';



import { LocalityService } from '../../shared/app-locality.service';
import { OrderModel, OrderCartModel, PackageListModel, JobTaskETAPreferenceModel } from '../../shared/model/order-model';
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

    public pickupTime: Date;
    public deliveryTime: Date;

    public _pickupYear: string;
    public _pickupMonth: string;
    public _pickupDate: string;
    public _pickupTime: string;

    public _deliveryYear: string;
    public _deliveryMonth: string;
    public _deliveryDate: string;
    public _deliveryTime: string;


    public years = ["2016", "2017", "2018", "2019", "2020"];
    public months = [
        { month: "January", value: "01" },
        { month: "February", value: "02" },
        { month: "March", value: "03" },
        { month: "April", value: "04" },
        { month: "May", value: "05" },
        { month: "June", value: "06" },
        { month: "July", value: "07" },
        { month: "August", value: "08" },
        { month: "September", value: "09" },
        { month: "October", value: "10" },
        { month: "November", value: "11" },
        { month:  "December", value: "12" }
    ];
    public dates = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];

    public timeHourMin = [
        {time: "09:00 AM", value: "T09:00:00Z"},
        {time: "09:30 AM", value: "T09:30:00Z"},

        {time: "10:00 AM", value: "T10:00:00Z"},
        {time: "10:30 AM", value: "T10:30:00Z"},

        {time: "11:00 AM", value: "T11:00:00Z"},
        {time: "11:30 AM", value: "T11:30:00Z"},

        {time: "12:00 PM", value: "T12:00:00Z"},
        {time: "12:30 PM", value: "T12:30:00Z"},

        {time: "01:00 PM", value: "T01:00:00Z"},
        {time: "01:30 PM", value: "T01:30:00Z"},

        {time: "02:00 PM", value: "T02:00:00Z"},
        {time: "02:30 PM", value: "T02:30:00Z"},

        {time: "03:00 PM", value: "T03:00:00Z"},
        {time: "03:30 PM", value: "T03:30:00Z"},

        {time: "04:00 PM", value: "T04:00:00Z"},
        {time: "04:30 PM", value: "T04:30:00Z"},

        {time: "05:00 PM", value: "T05:00:00Z"},
        {time: "05:30 PM", value: "T05:30:00Z"},

        {time: "06:00 PM", value: "T06:00:00Z"},
        {time: "06:30 PM", value: "T06:30:00Z"},

        {time: "07:00 PM", value: "T07:00:00Z"},
        {time: "07:30 PM", value: "T07:30:00Z"},

        {time: "08:00 PM", value: "T08:00:00Z"},
        {time: "08:30 PM", value: "T08:30:00Z"},

        {time: "09:00 PM", value: "T09:00:00Z"},
        {time: "09:30 PM", value: "T09:30:00Z"},
    ];



    constructor(private formBuilder: FormBuilder,
        private orderService: OrderService,
        private router: Router,
        private _localStorage: LocalStorage,
        private busService: DashboardBusService,
        private localityService: LocalityService) {
        this.busService.annouceSectionChange("New Order");

        this.initiateOrderModel("Delivery");
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

    onOrderTypeChange(newOrderType){
        this.initiateOrderModel(newOrderType);
        console.log(newOrderType);
    }

    onBuyerAddressChange(newAddress){
        this.orderModel.To.AddressLine1 = "";
        this.orderModel.To.AddressLine1 += this.orderModel.BuyerInfo.Name + ", ";
        this.orderModel.To.AddressLine1 += this.orderModel.BuyerInfo.PhoneNumber + ", ";
        this.orderModel.To.AddressLine1 += this.orderModel.BuyerInfo.Address.AddressLine1;

        console.log(this.orderModel.To.AddressLine1);
    }
    onSellerAddressChange(newAddress){
        this.orderModel.From.AddressLine1 = "";
        this.orderModel.From.AddressLine1 += this.orderModel.SellerInfo.Name + ", ";
        this.orderModel.From.AddressLine1 += this.orderModel.SellerInfo.PhoneNumber + ", ";
        this.orderModel.From.AddressLine1 += this.orderModel.SellerInfo.Address.AddressLine1;

        console.log(this.orderModel.From.AddressLine1);
    }

    processJobTaskPreferrenceETA(){
        if(this.orderModel.JobTaskETAPreference != [] && this.processJobTaskPreferrenceETA.length != 0){
            this.orderModel.JobTaskETAPreference = null;
        }

        let isTherAnyPickUpETA = this._pickupYear && this._pickupMonth && this._pickupDate && this._pickupTime? true: false;

        let isTherAnyDeliveryETA = this._deliveryYear && this._deliveryMonth && this._deliveryDate && this._deliveryTime? true : false;

        console.log("is there any pickup eta : " + isTherAnyPickUpETA);

        console.log("is there any delivery eta : " + isTherAnyDeliveryETA);

        if(isTherAnyPickUpETA || isTherAnyDeliveryETA){
            this.orderModel.JobTaskETAPreference = [];
            if(isTherAnyPickUpETA) {
                let picupETAString = this.orderService.dateConstructor(this._pickupYear, this._pickupMonth, this._pickupDate, this._pickupTime)
                let pickupETA = new JobTaskETAPreferenceModel("PackagePickUp", picupETAString );
                this.orderModel.JobTaskETAPreference.push(pickupETA);
            }
            if(isTherAnyDeliveryETA) {
                let deliveryETAString = this.orderService.dateConstructor(this._deliveryYear, this._deliveryMonth, this._deliveryDate, this._deliveryTime)
                let deliveryETA = new JobTaskETAPreferenceModel("Delivery", deliveryETAString);
                this.orderModel.JobTaskETAPreference.push(deliveryETA);
            }
        }
        console.log(this.orderModel.JobTaskETAPreference);

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
        this.orderModel = new OrderModel();
        this.orderModel.Type = orderType;
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
        this.initiateOrderModel("Delivery");
    }
}