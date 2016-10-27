import { Component, ViewChild, OnInit } from "@angular/core";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { VendorMenuService } from "./vendor-menu.service";
import { CartBusService } from '../cart/cart-bus.service';
import { CartSidebarComponent } from '../cart/cart-sidebar/cart-sidebar.component';
import { OrderModel, PackageListModel } from ".././shared/model/order-model";
import { Vendor, Item } from ".././shared/model/vendor";
import { OrderCartService } from '.././shared/order-cart.service';
import { Router, RouteParams } from '@angular/router-deprecated';
import { ProgressBubbleComponent } from './../common/progress-bubble/progress-bubble.component'
import { ComponentServiceStatus } from './../shared/component-service-status';


@Component({
    selector: 'vendor-menu',
    templateUrl: 'app/vendor-menu/vendor-menu.component.html',
    styleUrls: [ 'app/vendor-menu/vendor-menu.component.css' ],
    directives: [ MODAL_DIRECTIVES, ModalComponent, ProgressBubbleComponent, CartSidebarComponent],
    providers: [VendorMenuService, CartBusService, OrderCartService]
})



export class VendorMenuComponent implements OnInit {
    public vendor: any = {};
    public categories: {[category: string] : any[]} = {}
    vendorName: string;
    selectedItem : PackageListModel;
    clickedItem : Item;
    customeOrder: string = "";
    orderCart: OrderModel;
    openOrClosed: string;
    status: ComponentServiceStatus;

    constructor(private routeparams: RouteParams,
                private vendorDetailsService: VendorMenuService,
                private cartBusService: CartBusService,
                private orderCartService: OrderCartService){
    }


    ngOnInit(){
        this.vendorName = this.routeparams.get('vendorId');
        this.status = "IN_PROGRESS";
        this.vendorDetailsService.getVendorDetails(this.vendorName)
            .subscribe(store=>{
                this.vendor = store;
                this.vendor.Products.forEach(element => {
                    let prodCat = element.ProductCategories[0];
                    if(this.categories[prodCat]){
                        this.categories[prodCat].push({
                            Name: element.Name,
                            Price: element.Price,
                            Image: element.Image,
                            ShortDescription: element.ShortDescription
                        });
                    } else {
                        this.categories[prodCat] = [];
                        this.categories[prodCat].push({Name: element.Name, Price: element.Price});
                    }
                });
                this.status = "SUCCESSFUL";
            }, error=>{

            });
        // if(this.vendor.isOpen) this.openOrClosed = "Open";
        // else this.openOrClosed = "Closed";

        this.orderCart = this.orderCartService.getOrderCart();
        this.selectedItem = new PackageListModel();
        this.clickedItem = new Item();
        if(!this.orderCart.OrderCart.PackageList){
            this.orderCart.OrderCart.PackageList = [];
        }
    }

    addCustomOrder(){
        if(this.customeOrder){
            if(this.orderCart.Description === ''){
                this.orderCart.Description += this.vendorName + " : " + this.customeOrder;
            } else {
                this.orderCart.Description += "\n" + this.vendorName + " : " + this.customeOrder;
            }
            this.orderCartService.save(this.orderCart);
            this.cartBusService.announceCartNumberChange("cart number updated");
        }
    }

    keys(){
        return Object.keys(this.categories);
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

        this.clickedItem.item = item.Name;
        this.clickedItem.description = item.ShortDescription;
        this.clickedItem.image = item.Image;
        this.selectedItem.Item = item.Name + " (" + this.vendorName + ")";
        this.selectedItem.Price = item.Price;
        this.selectedItem.PicUrl = item.Image;
        this.selectedItem.Total = item.Price;
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
        this.orderCart = this.orderCartService.getOrderCart();
        this.orderCart.OrderCart.PackageList.push(this.selectedItem);
        this.orderCartService.save(this.orderCart);
    //

        this.cartBusService.announceCartNumberChange("cart number updated");
        this.selectedItem = new PackageListModel();
        this.closeCartModal();
    }
}