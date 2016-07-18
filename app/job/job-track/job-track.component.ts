import { Component, provide, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouteParams } from '@angular/router-deprecated';

import {
    MapsAPILoader,
    NoOpMapsAPILoader,
    MouseEvent,
    GOOGLE_MAPS_DIRECTIVES
} from 'angular2-google-maps/core/index';

import { JobTrackService } from './job-track.service';
import { Job, JobState } from '../shared/job';
import { CoordinateInfo } from '../shared/coordinateInfo';
import { OrderInfoService } from '../shared/orderInfo.service';
import { TimingInfoService, JobTaskTimeInfos } from '../shared/timingInfo.service';
import { ComponentServiceStatus } from '../../shared/component-service-status';
import { ProgressBubbleComponent } from '../../common/progress-bubble/progress-bubble.component';


@Component({
    selector: 'job-track',
    templateUrl: 'app/job/job-track/job-track.component.html',
    styleUrls: ['app/job/job-track/job-track.component.css'],
    directives: [ProgressBubbleComponent, GOOGLE_MAPS_DIRECTIVES],
    providers: [JobTrackService, OrderInfoService, TimingInfoService]
})
export class JobTrackComponent implements OnInit {

    public jobId: string;
    public job: Job;

    public status: ComponentServiceStatus = "IN_PROGRESS";
    public coordinateInfo: CoordinateInfo;
    public errorMessage: string;
    public orderStatusNumber: number;
    public assetLocation: any;
    public orderInfoHeading: string;
    public orderInfoDesc: string;
    public timingInfo: JobTaskTimeInfos;
    public assetInfo: Object[] = []; //to get a simplified asset array


    public mapMarker = {
        blueMarker: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        redMarker: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        purpleMarker: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
        yellowMarker: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        greenMarker: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    };

    constructor(private routeparams: RouteParams,
        private jobTrackService: JobTrackService,
        private orderInfoService: OrderInfoService,
        private timeInfoService: TimingInfoService) {

    }

    ngOnInit() {
        this.jobId = this.routeparams.get('jobId');
        this.getJob();
    }

    getJob() {
        this.jobTrackService.getJob(this.jobId)
            .subscribe((job) => {
                this.status = "SUCCESSFUL";
                this.job = job;
                this.fixingServerText(this.job);
                this.orderInfoHeading = this.orderInfoService.orderInfo(job).orderInfoHeading;
                this.orderInfoDesc = this.orderInfoService.orderInfo(job).orderInfoDesc;
                this.coordinateInfo = new CoordinateInfo(this.job);
                this.timingInfo = this.timeInfoService.getTimeInfo(job);


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
                else if (error.response.Message != undefined) {
                    this.errorMessage = error.Message;
                }
                console.log(this.errorMessage);
            });
    }

    fixingServerText(job: Job) {
        // this weird function is to streamline server responses
        // like, CashOnDelivery to Cash On Deliver ||
        // IN_PROGRESS to IN PROGRESS
        // Not sure whether it will stay here finally
        this.job.Order.PaymentMethod = "Cash On Delivery";
    }
}