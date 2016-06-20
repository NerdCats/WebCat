import {UserModel} from '../../shared/model/user-model';

export interface IJobJson {
    Id: string;
    HRID: string;
    Name: string;
    Order: Object; // INFO: Would come from #36
    User: UserModel;
    JobServedBy: Object; // Same as the previous one
    Tasks: Array<Object>;
    State: JobState; // INFO: Potential place for a string literal
    CreateTime: string;
    ModifiedTime: string;
    PreferredDeliveryTime: string;
    InvoiceId: string;
    PaymentMethod: string;
    Assets: Object;
    Deleted: boolean;
    PaymentStatus: string; // INFO: Potential place for a string literal
}

export class Job {
    Id: string;
    HRID: string;
    Name: string;
    Order: Object; // INFO: Would come from #36
    User: UserModel;
    JobServedBy: Object; // Same as the previous one
    Tasks: Array<Object>;
    State: JobState; // INFO: Potential place for a string literal
    CreateTime: Date;
    ModifiedTime: Date;
    PreferredDeliveryTime: Date;
    InvoiceId: string;
    PaymentMethod: string;
    Assets: Object;
    Deleted: boolean;
    PaymentStatus: string; // INFO: Potential place for a string literal

    toJSON(): IJobJson {
        return Object.assign({}, this, {
            CreateTime: this.CreateTime.toString(),
            ModifiedTime: this.ModifiedTime.toString(),
            PreferredDeliveryTime: this.PreferredDeliveryTime.toString()
        });
    }

    static fromJSON(json: IJobJson) {
        let job = Object.create(Job.prototype);
        return Object.assign(job, json, {
            CreateTime: new Date(json.CreateTime),
            ModifiedTime: new Date(json.ModifiedTime),
            PreferredDeliveryTime: new Date(json.PreferredDeliveryTime)
        });
    }
}

export type JobState = "ENQUEUED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
