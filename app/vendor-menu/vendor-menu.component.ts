import { Component, ViewChild, OnInit } from "@angular/core";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import { VendorDetailsService } from "./vendor-menu.service";
import { CartBusService } from '../cart/cart-bus.service';

import { OrderModel, PackageListModel } from ".././shared/model/order-model";
import { Vendor, Item } from ".././shared/model/vendor";
import { OrderCartService } from '.././shared/order-cart.service';
import { Router, RouteParams } from '@angular/router-deprecated';


@Component({
    selector: 'vendor-menu',
    templateUrl: 'app/vendor-menu/vendor-menu.component.html',
    styleUrls: ['app/vendor-menu/vendor-menu.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [VendorDetailsService, CartBusService, OrderCartService]
})



export class VendorMenuComponent implements OnInit {
    vendor: Vendor;
    vendorName: string;
    selectedItem : PackageListModel;
    clickedItem : Item;
    customeOrder: string = "";
    orderCart: OrderModel;
    openOrClosed: string;


    ngOnInit(){
        this.vendorName = this.routeparams.get('vendorId');
        this.vendor = this.vendorDetailsService.getVendorDetails(this.vendorName);
        if(this.vendor.isOpen) this.openOrClosed = "Open";
        else this.openOrClosed = "Closed";

        this.orderCart = this.orderCartService.getOrderCart();

        // REMOVE
        console.log("VendorMenuComponent.ngOnInit()");
        console.log(this.orderCart.OrderCart.PackageList);

        this.selectedItem = new PackageListModel();
        this.clickedItem = new Item();
        if(!this.orderCart.OrderCart.PackageList){
            this.orderCart.OrderCart.PackageList = [];
        }
    }

    constructor(private routeparams: RouteParams,
                private vendorDetailsService: VendorDetailsService,
                private cartBuseService: CartBusService,
                private orderCartService: OrderCartService){

    }


    addCustomOrder(){
        if(this.customeOrder){
            if(this.orderCart.Description === ''){
                this.orderCart.Description += this.vendorName + " : " + this.customeOrder;
            } else {
                this.orderCart.Description += "\n" + this.vendorName + " : " + this.customeOrder;
            }
            this.orderCartService.save(this.orderCart);
            console.log(this.orderCartService.getOrderCart());

            // REMOVE
            console.log("VendorMenuComponent.addCustomOrder()");
            console.log(this.orderCart.OrderCart.PackageList);
        }
    }

    clear(){
        this.customeOrder = "";
    }

    @ViewChild('cartModal')
    cartModal: ModalComponent;
    openCartModal(item){
        this.addItem(item);
        this.cartModal.open();
    }

    closeCartModal(){
        this.cartModal.close();
    }

    addItem(item) {
        console.log(item);

        this.clickedItem.item = item.item;
        this.clickedItem.description = item.description;
        this.selectedItem.Item = item.item + " (" + this.vendorName + ")";
        this.selectedItem.Price = item.price;
        this.selectedItem.Total = item.price;
        this.selectedItem.Quantity = 1;
    }

    addMore(){
        this.selectedItem.Total += this.selectedItem.Price;
        this.selectedItem.Quantity += 1;
    }

    addLess(){
        if(this.selectedItem.Quantity != 1)
        {
            this.selectedItem.Total -= this.selectedItem.Price;
            this.selectedItem.Quantity -= 1;
        }

    }

    addToCart(){

        // REMOVE
        console.log("VendorMenuComponent.addToCart()");
        console.log("PackageList_b4: ");
        this.orderCart.OrderCart.PackageList.forEach(element => {
            console.log(element.Item);
        });

        this.orderCart.OrderCart.PackageList.push(this.selectedItem);


        console.log("PackageList_Ftr: ");
        this.orderCart.OrderCart.PackageList.forEach(element => {
            console.log(element.Item);
        });

        this.orderCartService.save(this.orderCart);
        // console.log(this.orderCartService.getOrderCart());

        this.cartBuseService.announceCartNumberChange("cart number updated");
        this.selectedItem = new PackageListModel();
        this.closeCartModal();
    }
}