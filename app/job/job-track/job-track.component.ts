import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HTTP_PROVIDERS } from '@angular/http';
import { Router, RouteParams } from '@angular/router-deprecated';

import { JobService } from '../shared/job.service';
import { Job, JobState } from '../shared/job';
import { OrderInfo } from '../shared/orderInfo';
import { ComponentServiceStatus } from '../../shared/component-service-status';

import {ProgressBubbleComponent} from '../../common/progress-bubble/progress-bubble.component';


@Component({
    selector: 'job-track',
    templateUrl: 'app/job/job-track/job-track.component.html',
    styleUrls: ['app/job/job-track/job-track.component.css'],
    directives: [ProgressBubbleComponent],
    providers: [ HTTP_PROVIDERS, JobService ]
})



export class JobTrackComponent implements OnInit{

    public jobId: string;
    public job: Job;
    public orderInfo: OrderInfo;
    public status: ComponentServiceStatus = "IN_PROGRESS";
    public errorMessage: string;
    public orderStatusNumber: number;

    constructor(private params: RouteParams,
                private jobService: JobService){
        this.jobId = params.get('jobId');
    }
    ngOnInit(){
        this.getJob();
    }

    getJob(){
        this.jobService.getJob(this.jobId)
            .subscribe((job) => {
                this.status = "SUCCESSFUL";
                this.job = job;
                this.fixingServerText(this.job);
                this.orderStatusNumber  = this.findOrderStatus(this.job);
                this.orderInfo = new OrderInfo(this.orderStatusNumber);
            },
            (error) => {
                this.errorMessage = error.Message;
                this.status = "FAILED";
                console.log(this.errorMessage);
            });
    }

    fixingServerText(job: Job){
        // this weird function is to streamline server responses
        // like, CashOnDelivery to Cash On Deliver ||
        // IN_PROGRESS to IN PROGRESS
        // Not sure whether it will stay here finally
        this.job.Order.PaymentMethod = "Cash On Delivery";
    }

    findOrderStatus(job: Job){
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