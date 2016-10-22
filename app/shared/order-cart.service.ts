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
        }
    }



    public getOrderCart(){
        let orderCart = this.localStorage.getObject(this.ORDER_CART_KEY);
        if(orderCart)
        {
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
        return orderCart;
    }

    public totalQuantity(){
        let numberOfItems: number = 0;
        let orderCart = this.getOrderCart();
        if(orderCart.OrderCart.PackageList){
            orderCart.OrderCart.PackageList.forEach(item => {
                numberOfItems += item.Quantity;
            });
        }
        if(orderCart.Description){
            numberOfItems += 1;
        }
        return numberOfItems;
    }

    public hasPackageListItem(){
        let packageListItems: number = 0;
        let orderCart = this.getOrderCart();
        console.log(orderCart);

        if(orderCart.OrderCart.PackageList && orderCart.OrderCart.PackageList.length === 0){
            return false;
        }
        if(!orderCart.OrderCart.PackageList){
            return false;
        }
        return true;
    }
}