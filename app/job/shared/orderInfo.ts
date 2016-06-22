export class OrderInfo {
    public orderInfoHeading: string;
    public orderInfoDesc: string;

    constructor(statusNumber: number){
        switch (statusNumber) {
            case 1:
                this.orderInfoHeading = "Your Order is created, we will start processing it shortly!";
                this.orderInfoDesc = "We've got your order, we are getting it ready, a confirmation of your order will be sent to <b>user@email.com.</b>";
                break;
            case 2:
                this.orderInfoHeading = "Your Order is confirmed, Pickup is in progress!";
                this.orderInfoDesc = "We've accepted your Order, A confirmation email has been sent to <b>user@email.com</b>. Come back to this page for updates on your Order status.";
                break;
            case 3:
                this.orderInfoHeading = "Your Pickup has been completed, Delivery is in progress!";
                this.orderInfoDesc = "Your Pickup is completed, Delivery is in progress. Come back to this page for updates on your Order status.";
                break;
            case 4:
                this.orderInfoHeading = "You Delivery has been completed!";
                this.orderInfoDesc = "Thank you for using our system";
                break;
            default:
                break;
        }
    }
}