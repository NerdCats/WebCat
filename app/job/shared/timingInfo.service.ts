import { Injectable } from '@angular/core';
import { Job } from './job';


class TimeInfo {
    public heading: string;
    public time: any;

    constructor(heading, time) {
        this.heading = heading;
        this.time = time;
    }
}

class TimeType {
    public startTime: TimeInfo;
    public completedTime: TimeInfo;
    public totalTime: TimeInfo;
}
export class JobTaskTimeInfos {
    public pickup: TimeType;
    public delivery: TimeType;
    constructor() {
        this.pickup = new TimeType();
        this.delivery = new TimeType();
    }
}


@Injectable()
export class TimingInfoService {
    getTimeInfo(job: Job) {
        let jobTaskTimeInfo = new JobTaskTimeInfos();
        job.Tasks.forEach(task => {
            if (task.Type === "PackagePickUp") {
                jobTaskTimeInfo.pickup.startTime = new TimeInfo("Pickup Started", task.CreateTime);
                jobTaskTimeInfo.pickup.completedTime = new TimeInfo("Pickup Completed", task.ModifiedTime);
                jobTaskTimeInfo.pickup.totalTime = new TimeInfo("Total Time", task.CompletionTime);
            }
            if (task.Type === "Delivery") {
                jobTaskTimeInfo.delivery.startTime = new TimeInfo("Delivery Started", task.CreateTime);
                jobTaskTimeInfo.delivery.completedTime = new TimeInfo("Delivery Completed", task.ModifiedTime);
                jobTaskTimeInfo.delivery.totalTime = new TimeInfo("Total Time", task.CompletionTime);
            }
        });
        return jobTaskTimeInfo;
    }
}