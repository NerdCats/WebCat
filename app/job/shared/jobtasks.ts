import {DefaultAddress} from '../../shared/model/geocoding.defaultAddress'

export class JobTask {
    id: string;
    Type: string;
    JobTaskStateString: string;
    State: string;
    AssetRef: string;
    ETA: Date;
    CreateTime: Date;
    InitiationTime: Date;
    ModifiedTime: Date;
    CompletionTime: Date;
    Duration: string;
    IsReadytoMoveToNextTask: boolean;
    IsDependencySatisfied: boolean;
    IsStartingTask: boolean;
    IsTerminatingTask: boolean;
    ETAFailed: boolean;

    constructor(task: any) {
        this.id = task["id"];
        this.Type = task["Type"];
        this.JobTaskStateString = task["JobTaskStateString"];
        this.State = task["State"];
        this.AssetRef = task["AssetRef"];

        if(task["ETA"]!=null)
            this.ETA = new Date(task["ETA"]);
        if(task["CreateTime"]!=null)
            this.CreateTime = new Date(task["CreateTime"]);
        if(task["InitiationTime"]!=null)
            this.InitiationTime = new Date(task["InitiationTime"]);
        if(task["ModifiedTime"]!=null)
            this.ModifiedTime = new Date(task["ModifiedTime"]);
        if(task["CompletionTime"]!=null)
            this.CompletionTime = new Date(task["CompletionTime"]);



        this.Duration = task["Duration"];
        this.IsReadytoMoveToNextTask = task["IsReadytoMoveToNextTask"];
        this.IsDependencySatisfied = task["IsDependencySatisfied"];
        this.IsStartingTask = task["IsStartingTask"];
        this.IsTerminatingTask = task["IsTerminatingTask"];
        this.ETAFailed = task["ETAFailed"];
    }
}

export class FetchDeliveryManJobTask extends JobTask {
    From: DefaultAddress;
    To: DefaultAddress;
    constructor(task: any) {
        super(task);
        this.From = task["From"];
        this.To = task["To"];
    }
}

export class PackagePickUpJobTask extends JobTask {
    PickupLocation: DefaultAddress;
    constructor(task: any) {
        super(task);
        this.PickupLocation = task["PickupLocation"];
    }
}

export class DeliveryJobTask extends JobTask {
    From: DefaultAddress;
    To: DefaultAddress;
    constructor(task: any) {
        super(task);
        this.From = task["From"];
        this.To = task["To"];
    }
}

export class SecureDeliveryJobTask extends JobTask {
    From: DefaultAddress;
    To: DefaultAddress;
    constructor(task: any) {
        super(task);
        this.From = task["From"];
        this.To = task["To"];
    }
}