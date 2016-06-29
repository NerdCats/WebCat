import { Injectable } from '@angular/core';
import { Job } from './job';


@Injectable()
export class OrderInfoService {
    orderInfo(job: Job){
        let _orderInfoHeading: string;
        let _orderInfoDesc: string;

        let statusNumber = this.findOrderStatus(job);
        switch (statusNumber) {
            case 1:
                _orderInfoHeading = "Your Order is created, we will start processing it shortly!";
                _orderInfoDesc = "We've got your order, we are getting it ready, a confirmation of your order will be sent to <b>"+ job.User.Email +".</b>";
                break;
            case 2:
                _orderInfoHeading = "Your Order is confirmed, Pickup is in progress!";
                _orderInfoDesc = "We've accepted your Order. Come back to this page for updates on your Order status. A confirmation email has been sent to <b>"+ job.User.Email +"</b>";
                break;
            case 3:
                _orderInfoHeading = "Your Pickup has been completed, Delivery is in progress!";
                _orderInfoDesc = "Your Pickup is completed, Delivery is in progress. Come back to this page for updates on your Order status.";
                break;
            case 4:
                _orderInfoHeading = "You Delivery has been completed!";
                _orderInfoDesc = "Thank you for using our service";
                break;
            default:
                break;
        }

        return {
            orderInfoHeading : _orderInfoHeading,
            orderInfoDesc : _orderInfoDesc
        }
    }

    // INFO: This is shamefully ugly
    private findOrderStatus(job: Job) {
        if (job.Order.Type == "Delivery") {
            if (job.State == "ENQUEUED") {
                return 1;
            }
            else if (job.State == "IN_PROGRESS") {
                if (job.Tasks[1]["Type"] == "PackagePickUp"
                    && job.Tasks[1]["State"] == "IN_PROGRESS") {
                    return 2;
                }
                else if (job.Tasks[2]["Type"] == "Delivery"
                    && job.Tasks[2]["State"] == "IN_PROGRESS") {
                    return 3;
                }
            }
            else if (job.State == "COMPLETED") {
                return 4;
            }
        }
    }
}