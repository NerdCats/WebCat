
import { OrderModel } from './order-model'

export class OrderCart {
    private static orderCart : OrderModel = new OrderModel();
    private static numberOfItems: number = 0;
    public static getOrderCart(){
        return OrderCart.orderCart;
    }

    public static resetOrderCart(){
        OrderCart.orderCart = new OrderModel();
    }

    public static update(){
        if(this.orderCart.OrderCart.PackageList){

            this.orderCart.OrderCart.SubTotal = 0;
            this.orderCart.OrderCart.TotalToPay = 0;
            this.orderCart.OrderCart.ServiceCharge = 150;

            this.orderCart.OrderCart.PackageList.forEach(item => {
                this.orderCart.OrderCart.SubTotal += (item.Price * item.Quantity);
                this.orderCart.OrderCart.TotalToPay += this.orderCart.OrderCart.SubTotal +
                                                    this.orderCart.OrderCart.ServiceCharge;
                item.Total = 0;
                item.Total = (item.Price * item.Quantity);
            })
        }
    }

    public static totalQuantity(){
        this.numberOfItems = 0;
        if(this.orderCart.OrderCart.PackageList){
            this.orderCart.OrderCart.PackageList.forEach(item => {
                this.numberOfItems += item.Quantity;
            });
        }
        if(this.orderCart.Description){
            this.numberOfItems += 1;
        }
        return this.numberOfItems;
    }
}