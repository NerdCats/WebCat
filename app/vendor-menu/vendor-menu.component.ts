import { Component, ViewChild, OnInit } from "@angular/core";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import { VendorDetailsService } from "./vendor-menu.service";
import { CartBusService } from '../cart/cart-bus.service';

import { OrderModel, PackageListModel } from ".././shared/model/order-model";
import { OrderCartService } from '.././shared/order-cart.service';



@Component({
    selector: 'vendor-menu',
    templateUrl: 'app/vendor-menu/vendor-menu.component.html',
    styleUrls: ['app/vendor-menu/vendor-menu.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [VendorDetailsService, CartBusService, OrderCartService]
})



export class VendorMenuComponent implements OnInit {
    vendor: any;
    selectedItem : PackageListModel;
    customeOrder: string = "";
    orderCart: OrderModel;


    ngOnInit(){
        this.vendor = this.vendorDetailsService.vendorDetails;
        this.orderCart = this.orderCartService.getOrderCart();
        this.orderCart.OrderCart.PackageList = [];
        this.selectedItem = new PackageListModel();
    }

    constructor(private vendorDetailsService: VendorDetailsService,
                private cartBuseService: CartBusService,
                private orderCartService: OrderCartService){

    }


    addCustomOrder(){
        if(this.customeOrder){
            this.orderCart.Description = this.customeOrder;
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
        this.selectedItem.Item = item.item;
        this.selectedItem.Price = item.price;
        this.selectedItem.Total = item.price;
        this.selectedItem.Quantity = 1;

        console.log(this.orderCartService.getOrderCart().OrderCart.PackageList);

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
        this.orderCart.OrderCart.PackageList.push(this.selectedItem);
        this.orderCartService.save(this.orderCart);
        console.log(this.orderCartService.getOrderCart());

        this.cartBuseService.announceCartNumberChange("cart number updated");
        this.selectedItem = new PackageListModel();
        this.closeCartModal();
    }
}