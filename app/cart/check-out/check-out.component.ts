import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { ControlGroup, Validators, FormBuilder } from '@angular/common';
import { OrderCartService } from '../../shared/order-cart.service';
import { LocalStorage } from '../../shared/local-storage';
import { OrderService } from '../../dashboard/order/order.service';
import { OrderModel, PackageListModel } from '../../shared/model/order-model';
import { AppSettings } from '../../shared/app.settings';
import { AccountService } from '../../../app/account/shared/account.service';

@Component({
    selector: 'check-out',
    templateUrl: 'app/cart/check-out/check-out.component.html',
    styleUrls: ['app/cart/check-out/check-out.component.css'],
    providers: [OrderCartService, LocalStorage, OrderService, AccountService]
})


export class CheckOutComponent {

    orderCart: OrderModel;
    userId: string;
    errorMessage: string;
    orderSubmission: string;
    receiversName: string;
    receiversPhonenumber: string;
    checkOutForm: ControlGroup;
    profile:any;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private orderCartService: OrderCartService,
                private orderService: OrderService,
                private localStorage: LocalStorage,
                private accountService: AccountService){
        this.initiateForm();
        this.orderSubmission = 'PENDING';
        this.orderCart = orderCartService.getOrderCart();
        this.orderCart.PaymentMethod = "CashOnDelivery"
        this.orderCart.UserId = localStorage.getObject(AppSettings.AUTH_TOKEN_KEY).userId;
        this.accountService.getProfile(this.orderCart.UserId)
            .subscribe(res=>{
                if(res.Profile.FirstName && res.Profile.LastName)
                    this.receiversName =  (res.Profile.FirstName + " " + res.Profile.LastName)
                else this.receiversName = res.UserName;
                this.receiversPhonenumber = res.PhoneNumber;
            }, error => {

            })
    }

    initiateForm() {
        let checkOutControls = {
            "receiversName": ['', Validators.required],
            "receiversPhonenumber": ['', Validators.required],
            "deliveryAddress": ['', Validators.required],
            "orderType": ['', Validators.required]
        };
        this.checkOutForm = this.formBuilder.group(checkOutControls);
    }

    itemChanged(value){
        this.orderCartService.save(this.orderCart);
        this.orderCart = this.orderCartService.getOrderCart();
    }

    removeItem(index: number) {
        this.orderCart.OrderCart.PackageList.splice(index, 1);
        this.orderCartService.save(this.orderCart);
        window.location.reload();
    }

    confirmOrder(){
        // FIXME: for now
        this.orderCart.From.AddressLine1 = "GObd, H-28, R-20, Block-K, Banani";
        this.orderCart.To.AddressLine1 = this.receiversName + ", \n " + this.receiversPhonenumber
                                        + ", \n " + this.orderCart.To.AddressLine1;
        this.orderCart.Type = "Delivery";
        this.orderSubmission = 'IN_PROGRESS';
        this.orderCart.OrderCart.SubTotal = 0;
        this.orderCart.OrderCart.TotalToPay = 0;
        if(this.orderCart.OrderCart.PackageList){
            this.orderCart.OrderCart.PackageList.forEach(item => {
                item.Total = 0;
            })
        }

        this.orderService.createOrder(this.orderCart)

            .subscribe((result)=> {
                let job = JSON.parse(result._body);
                this.orderSubmission = 'COMPLETED';
                this.orderCartService.resetOrderCart();
                this.router.navigateByUrl("/track/" + job.HRID);
            },
            (error)=> {
                this.orderSubmission = 'FAILED';
                this.errorMessage = error;
            });
    }
}