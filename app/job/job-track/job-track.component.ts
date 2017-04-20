import { Component, provide, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouteParams } from '@angular/router-deprecated';
import { CssHelper } from '../../shared/css-helper'

import {
    MapsAPILoader,
    NoOpMapsAPILoader,
    MouseEvent,
    GOOGLE_MAPS_DIRECTIVES
} from 'angular2-google-maps/core/index';

import { JobTrackService } from './job-track.service';
import { Job, JobState } from '../shared/job';
import { JobTask } from '../shared/jobtasks';

import { CoordinateInfo } from '../shared/coordinateInfo';
import { OrderInfoService } from '../shared/orderInfo.service';

import { ComponentServiceStatus } from '../../shared/component-service-status';
import { Comment } from '../shared/comment';
import { ProgressBubbleComponent } from '../../common/progress-bubble/progress-bubble.component';


@Component({
    selector: 'job-track',
    templateUrl: 'app/job/job-track/job-track.component.html',
    styleUrls: ['app/job/job-track/job-track.component.css'],
    directives: [ProgressBubbleComponent, GOOGLE_MAPS_DIRECTIVES],
    providers: [JobTrackService, OrderInfoService]
})
export class JobTrackComponent implements OnInit {

    public jobId: string;
    public job: Job;
    public comments: Comment;


    public status: ComponentServiceStatus = "IN_PROGRESS";
    public coordinateInfo: CoordinateInfo;
    public errorMessage: any;
    public assetLocation: any;
    public orderStatusHeading: string;
    public orderStatusDesc: string;
    public assetInfo: Object[] = []; //to get a simplified asset array
    public tasksTiming: JobTask[] = [];


    public mapMarker = {
        blueMarker: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        redMarker: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        purpleMarker: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
        yellowMarker: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        greenMarker: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    };

    constructor(private routeparams: RouteParams,
        private jobTrackService: JobTrackService,
        private orderInfoService: OrderInfoService) {

    }


    ngOnInit() {
        this.jobId = this.routeparams.get('jobId');
        this.getJob();
        this.getComment();
    }

    getJob() {
        this.jobTrackService.getJob(this.jobId)
            .subscribe((job) => {
                this.status = "SUCCESSFUL";
                this.job = job;
                this.orderStatusHeading = this.orderInfoService.orderInfo(job).orderStatusHeading;
                this.orderStatusDesc = this.orderInfoService.orderInfo(job).orderStatusDesc;
                this.coordinateInfo = new CoordinateInfo(this.job);
                this.job.Tasks.forEach(element => {
                    if(element.Type !== "FetchDeliveryMan"){
                        this.tasksTiming.push(element);
                    }
                });

                for (var key in this.job.Assets) {
                    //creating that simplified asset array
                    this.assetInfo.push(this.job.Assets[key]);
                    this.assetLocation = this.jobTrackService.getAssetLocation(key)
                        .subscribe((location) => {
                            this.coordinateInfo.assetLocationAvailable = true;
                            this.assetLocation = location;
                        },
                        (error) => {

                        })
                }
                this.fixingServerText(); // this should be called at the end
            },
            (error) => {
                this.status = "FAILED";
                console.log(error);
                if (error.status == 404) {
                    this.errorMessage = "Order not found!";
                }
                else if (error.status == 500) {
                    this.errorMessage = "Failed to load the status of your Order, kindly refresh!";
                }
                else {
                    this.errorMessage = error.Message;
                }
                console.log(this.errorMessage);
            });
    }

    getComment() {
        this.jobTrackService.getComments(this.jobId)
            .subscribe(comments => {
                this.comments = comments["data"];
                console.log(this.comments);
            })
    }

    getCssClass(word){
        return CssHelper.getCssLabel(word);
    }

    fixingServerText() {
        // this weird function is to streamline server responses
        // like, CashOnDelivery to Cash On Deliver ||
        // IN_PROGRESS to IN PROGRESS
        // Not sure whether it will stay here finally
        this.job.Order.PaymentMethod = "Cash On Delivery";

        this.tasksTiming.forEach(task => {
            if(task.Type === "PackagePickUp") task.Type = "Pickup";
            if(task.Type === "SecureDelivery") task.Type = "Secured Delivery";
            if(task.Type === "Delivery" && task.Variant === "retry") task.Type = "Retry Delivery";
            if(task.Type === "Delivery" && task.Variant === "return") task.Type = "Package Return";

            console.log(task.Variant);

            if(task.Duration){
                console.log(task.Duration);

                task.Duration = task.Duration.substr(0,8)
            }

        })
    }
}