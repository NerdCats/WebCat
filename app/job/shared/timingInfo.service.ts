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
                jobTaskTimeInfo.pickup.startTime = new TimeInfo("Pickup Started", task.InitiationTime);
                jobTaskTimeInfo.pickup.completedTime = new TimeInfo("Pickup Completed", task.CompletionTime);
                jobTaskTimeInfo.pickup.totalTime = new TimeInfo("Total Time", task.Duration);
                console.log(task)
            }
            if (task.Type === "Delivery") {
                jobTaskTimeInfo.delivery.startTime = new TimeInfo("Delivery Started", task.InitiationTime);
                jobTaskTimeInfo.delivery.completedTime = new TimeInfo("Delivery Completed", task.CompletionTime);
                jobTaskTimeInfo.delivery.totalTime = new TimeInfo("Total Time", task.Duration);
            }
        });
        return jobTaskTimeInfo;
    }
}