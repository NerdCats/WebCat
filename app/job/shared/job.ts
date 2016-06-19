export interface IJobJson {
    Id: string;
    HRID: string;
    Name: string;
    Order: Object; // INFO: Would come from #36
    User: Object; // INFO: Not sure, is this written somewhere, only expand if need be
    JobServedBy: Object; // Same as the previous one
    Tasks: Array<Object>;
    State: string; // INFO: Potential place for a string literal
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
    User: Object; // INFO: Not sure, is this written somewhere, only expand if need be
    JobServedBy: Object; // Same as the previous one
    Tasks: Array<Object>;
    State: string; // INFO: Potential place for a string literal
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
            CreateTime: new Date(json.CreateTime)
        });
    }
}

