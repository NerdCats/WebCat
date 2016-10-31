import { Injectable } from '@angular/core';
import { Job } from './job';


@Injectable()
export class OrderInfoService {
    orderInfo(job: Job){
        let _orderStatusHeading: string;
        let _orderStatusDesc: string;
        console.log(job.CancellationReason);
        if(job.CancellationReason === "") {
            job.CancellationReason = "No reason mentioned, contact GO! Fetch";
            console.log(job.CancellationReason);
        }

        let statusNumber = this.findOrderStatus(job);

        switch (statusNumber) {
            case 1:
                _orderStatusHeading = "Your Order is created, we will start processing it shortly!";
                _orderStatusDesc = "We've got your order, we are getting it ready.";
                break;
            case 2:
                _orderStatusHeading = "Your Order is confirmed, Pickup is in progress!";
                _orderStatusDesc = "We've accepted your Order. Come back to this page for updates on your Order status.";
                break;
            case 3:
                _orderStatusHeading = "Your Pickup has been completed, Delivery is in progress!";
                _orderStatusDesc = "Your Pickup is completed, delivery is in progress. Come back to this page for updates on your Order status.";
                break;
            case 4:
                _orderStatusHeading = "Your Delivery has been completed!";
                _orderStatusDesc = "Thank you for using our service";
                break;
            case 5:
                _orderStatusHeading = "Your Delivery has been completed, Secured Delivery is in progress!";
                _orderStatusDesc = "Your Delivery is completed, cash delivery is in progress. Come back to this page for updates on your Order status.";
                break;
            case 6:
                _orderStatusHeading = "Your Secured Delivery has been completed!";
                _orderStatusDesc = "Thank you for using our service";
                break;
            case 7:
                _orderStatusHeading = "Your order has been cancelled!";
                _orderStatusDesc = "Your order has been cancelled during pickup, cancellation reason is : " + job.CancellationReason;
                break;
            case 8:
                _orderStatusHeading = "Your order has been cancelled!";
                _orderStatusDesc = "Your order has been cancelled during delivery, cancellation reason is : " + job.CancellationReason;
                break;
            case 9:
                _orderStatusHeading = "Your order has been cancelled!";
                _orderStatusDesc = "Your order has been cancelled during cash delivery, cancellation reason is : " + job.CancellationReason;
                break;
            case 10:
                _orderStatusHeading = "Your order has been cancelled!";
                _orderStatusDesc = "Your order has been cancelled before processing, cancellation reason is : " + job.CancellationReason;
                break;
            default:
                break;
        }

        return {
            orderStatusHeading : _orderStatusHeading,
            orderStatusDesc : _orderStatusDesc
        }
    }

    private findOrderStatus(job: Job): number {
        let status = 0;
        job.Tasks.forEach(task => {
            if (task.Type === "FetchDeliveryMan") {
                if(task.State == "PENDING"){
                    status = 1;
                } else if (task.State == "CANCELLED") {
                    status = 10;
                }
            }
            else if (task.Type === "PackagePickUp") {
                if(task.State == "IN_PROGRESS"){
                    status = 2;
                } else if (task.State == "CANCELLED"){
                    status = 7;
                }
            }
            else if (task.Type === "Delivery") {
                if (task.State === "IN_PROGRESS") {
                    status = 3;
                }
                else if (task.State === "COMPLETED") {
                    status = 4;
                } else if (task.State == "CANCELLED"){
                    status = 8;
                }
            }
            else if (task.Type === "SecureDelivery"){
                if (task.State === "IN_PROGRESS") {
                    status = 5;
                }
                else if (task.State === "COMPLETED") {
                    status = 6;
                } else if (task.State == "CANCELLED"){
                    status = 9;
                }
            }
        });
        return status;
    }
}