import { Injectable } from '@angular/core';
import { Job } from './job';


@Injectable()
export class OrderInfoService {
    orderInfo(job: Job){
        let _orderStatusHeading: string;
        let _orderStatusDesc: string;

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
                _orderStatusDesc = "Your Pickup is completed, Delivery is in progress. Come back to this page for updates on your Order status.";
                break;
            case 4:
                _orderStatusHeading = "You Delivery has been completed!";
                _orderStatusDesc = "Thank you for using our service";
                break;
            default:
                break;
        }

        return {
            orderStatusHeading : _orderStatusHeading,
            orderStatusDesc : _orderStatusDesc
        }
    }

    // INFO: This is shamefully ugly
    private findOrderStatus(job: Job): number {
        let status = 0;
        job.Tasks.forEach(task => {
            if (task.Type === "FetchDeliveryMan" && task.State == "PENDING") {
                status = 1;
            }
            else if (task.Type === "PackagePickUp" && task.State == "IN_PROGRESS") {
                status = 2;
            }
            else if (task.Type === "Delivery") {
                if (task.State === "IN_PROGRESS") {
                    status = 3;
                }
                else if (task.State === "COMPLETED") {
                    status = 4;
                }
            }
        });
        return status;
    }
}