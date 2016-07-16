import {DefaultAddress} from '../../shared/model/geocoding.defaultAddress'

export class JobTask {
    id: string;
    Type: string;
    JobTaskStateString: string;
    State: string;
    AssetRef: string;
    CreateTime: Date;
    ModifiedTime: Date;
    CompletionTime: Date;
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
        this.CreateTime = new Date(task["CreateTime"]);
        this.ModifiedTime = new Date(task["ModifiedTime"]);
        this.CompletionTime = new Date(task["CompletionTime"]);
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