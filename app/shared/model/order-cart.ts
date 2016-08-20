
import { OrderModel } from './order-model'

export class OrderCart {
    private static orderCart : OrderModel = new OrderModel();

    public static getOrderCart(){
        return OrderCart.orderCart;
    }

    public static resetOrderCart(){
        OrderCart.orderCart = new OrderModel();
    }
}