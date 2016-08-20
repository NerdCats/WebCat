import { Component, ViewChild, OnInit } from "@angular/core";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import { VendorDetailsService } from "./vendor-menu.service";
import { OrderModel, PackageListModel } from ".././shared/model/order-model";
import { OrderCart } from '.././shared/model/order-cart';

@Component({
    selector: 'vendor-menu',
    templateUrl: 'app/vendor-menu/vendor-menu.component.html',
    styleUrls: ['app/vendor-menu/vendor-menu.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [VendorDetailsService]
})



export class VendorMenuComponent implements OnInit {
    vendor: any;
    selectedItem : PackageListModel;

    orderCart: OrderModel;


    ngOnInit(){
        this.vendor = this.vendorDetailsService.vendorDetails;
        this.orderCart = OrderCart.getOrderCart();
        this.orderCart.OrderCart.PackageList = [];
        this.selectedItem = new PackageListModel();
    }

    constructor(private vendorDetailsService: VendorDetailsService){

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
        this.selectedItem.Quantity = 1;

        console.log(this.orderCart.OrderCart.PackageList);

    }

    addMore(){
        if(this.selectedItem.Quantity === 1)
        {
            this.selectedItem.Price += this.selectedItem.Price;
        }
        else {
            this.selectedItem.Price += (this.selectedItem.Price/this.selectedItem.Quantity);
        }
        this.selectedItem.Quantity += 1;
    }

    addLess(){
        if(this.selectedItem.Quantity != 1)
        {
            this.selectedItem.Price -= (this.selectedItem.Price/this.selectedItem.Quantity);
            this.selectedItem.Quantity -= 1;
        }

    }

    addToCart(){
        this.orderCart.OrderCart.PackageList.push(this.selectedItem);
        this.closeCartModal();
        this.selectedItem = new PackageListModel();
    }





}