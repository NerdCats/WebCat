import { Injectable } from '@angular/core';
import { LocalStorage } from '../shared/local-storage';
import { OrderModel } from './model/order-model';
import { AppSettings } from '../shared/app.settings';

@Injectable()
export class OrderCartService {
    private ORDER_CART_KEY: string = AppSettings.ORDER_CART_KEY;
    constructor(private localStorage: LocalStorage){}

    public save(orderCart: OrderModel){
        if(orderCart!== undefined){
            orderCart = this.update(orderCart);
            this.localStorage.setObject(this.ORDER_CART_KEY,orderCart);

            // REMOVE
            console.log("-----");
            console.log("OrderCartService.save(orderCart):");
            orderCart.OrderCart.PackageList.forEach(element => {
                console.log("PackageList.Item: " + element.Item);
            });
            console.log("-----");
        }
    }



    public getOrderCart(){
        let orderCart = this.localStorage.getObject(this.ORDER_CART_KEY);
        if(orderCart)
        {
            // REMOVE
            console.log("OrderCartService.getOrderCart(): true");
            console.log(orderCart);

            return orderCart;
        }
        else
        {
            orderCart = new OrderModel();
            this.save(orderCart)
            return orderCart;
        }
    }

    public resetOrderCart(){
        let orderCart = this.getOrderCart();
        orderCart = new OrderModel();
        this.save(orderCart);

        // REMOVE
        console.log("OrderCartService.resetOrderCart()");
        console.log(orderCart);
    }

    private update(orderCart: OrderModel){
        if(orderCart.OrderCart.PackageList){
            orderCart.OrderCart.SubTotal = 0;
            orderCart.OrderCart.TotalToPay = 0;
            orderCart.OrderCart.ServiceCharge = 150;

            orderCart.OrderCart.PackageList.forEach(item =>
            {
                orderCart.OrderCart.SubTotal += (item.Price * item.Quantity);
                item.Total = 0;
                item.Total = (item.Price * item.Quantity);
            })
            orderCart.OrderCart.TotalToPay += (orderCart.OrderCart.SubTotal +
                                                    orderCart.OrderCart.ServiceCharge);
        }
        // REMOVE
        console.log("OrderCartService.update()");
        console.log(orderCart.OrderCart.PackageList);

        return orderCart;
    }

    public totalQuantity(){
        let numberOfItems: number = 0;
        let orderCart = this.getOrderCart();
        if(orderCart.OrderCart.PackageList){
            orderCart.OrderCart.PackageList.forEach(item => {
                numberOfItems += item.Quantity;
            });

            // REMOVE
            console.log("OrderCartService.totalQuantity()");
            console.log(">> if(orderCart.OrderCart.PackageList)");
            console.log(orderCart);
        }
        if(orderCart.Description){
            numberOfItems += 1;

            // REMOVE
            console.log("OrderCartService.totalQuantity()");
            console.log(">> if(orderCart.Description)");
            console.log(orderCart);
        }
        return numberOfItems;
    }

    public hasPackageListItem(){
        let packageListItems: number = 0;
        let orderCart = this.getOrderCart();
        if(orderCart.OrderCart.PackageList && orderCart.OrderCart.PackageList.length === 0){
            return false;
        }
        return true;
    }
}