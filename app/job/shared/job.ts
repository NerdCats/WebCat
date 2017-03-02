import {UserModel} from '../../shared/model/user-model';
import {OrderModel} from '../../shared/model/order-model';
import {JobTask, FetchDeliveryManJobTask, PackagePickUpJobTask, DeliveryJobTask, SecureDeliveryJobTask} from './jobtasks';

export interface IJobJson {
    Id: string;
    HRID: string;
    HRState: string;
    Name: string;
    Order: OrderModel; // INFO: Would come from #36
    User: UserModel;
    JobServedBy: Object; // Same as the previous one
    Tasks: Array<JobTask>;
    State: JobState; // INFO: Potential place for a string literal
    CreateTime: string;
    ModifiedTime: string;
    CompletionTime: string;
    PreferredDeliveryTime: string;
    InvoiceId: string;
    PaymentMethod: string;
    Assets: { [id: string] : Object; };
    Deleted: boolean;
    PaymentStatus: string; // INFO: Potential place for a string literal
    CancellationReason: string;
}



export class Job {
    Id: string;
    HRID: string;
    Name: string;
    Order: OrderModel; // INFO: Would come from #36
    User: UserModel;
    JobServedBy: Object; // Same as the previous one
    Tasks: Array<JobTask>;
    State: JobState; // INFO: Potential place for a string literal
    CreateTime: Date;
    ModifiedTime: Date;
    CompletionTime: Date;
    PreferredDeliveryTime: Date;
    InvoiceId: string;
    PaymentMethod: string;
    Assets: { [id: string] : Object; };;
    Deleted: boolean;
    PaymentStatus: string; // INFO: Potential place for a string literal
    CancellationReason: string;
    toJSON(): IJobJson {
        return Object.assign({}, this, {
            CreateTime: this.CreateTime.toString(),
            ModifiedTime: this.ModifiedTime.toString(),
            CompletionTime: this.CompletionTime.toString(),
            PreferredDeliveryTime: this.PreferredDeliveryTime.toString()
        });
    }

    static fromJSON(json: IJobJson) : Job {
        let job = Object.create(Job.prototype);
        var assignedJob =  Object.assign(job, json, {
            CreateTime: new Date(json.CreateTime),
            ModifiedTime: new Date(json.ModifiedTime),
            CompletionTime: new Date(json.CompletionTime),
            PreferredDeliveryTime: new Date(json.PreferredDeliveryTime),
            Tasks: []
        });

        json.Tasks.forEach(task => {
            switch (task["Type"]){
                case "FetchDeliveryMan":
                    job.Tasks.push(new FetchDeliveryManJobTask(task));
                    break;
                case "PackagePickUp":
                    job.Tasks.push(new PackagePickUpJobTask(task));
                    break;
                case "Delivery":
                    job.Tasks.push(new DeliveryJobTask(task));
                    break;
                case "SecureDelivery":
                    job.Tasks.push(new SecureDeliveryJobTask(task));
                    break;
                default:
                    break;
            }
        });
        return assignedJob as Job;
    }
}

export type JobState = "ENQUEUED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "RETURNED" | "ALL";
