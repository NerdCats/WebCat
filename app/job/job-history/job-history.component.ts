import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import {JobService} from '../shared/job.service';
import {Job} from '../shared/job';

import {ComponentServiceStatus} from '../../shared/component-service-status';

import {ProgressBubbleComponent} from '../../common/progress-bubble/progress-bubble.component';
import {WidgetHeaderComponent} from '../../common/widget-header/widget-header.component';
import {WidgetBodyComponent} from '../../common/widget-body/widget-body.component';

export type AccessMode = "DEFAULT" | "ADMIN";
export type ComponentMode = "WIDGET" | "FULL";

@Component({
    selector: 'job-history',
    templateUrl: 'app/job/job-history/job-history.component.html',
    directives: [ProgressBubbleComponent, WidgetHeaderComponent, WidgetBodyComponent],
    providers: [JobService]
})
export class JobHistoryComponent implements OnInit {
    @Input()
    set cmode(componentMode: ComponentMode) {
        this.componentMode = componentMode || "WIDGET";
    }

    jobs: Array<Job>;
    status: ComponentServiceStatus = "IN_PROGRESS";
    accessMode: AccessMode = "DEFAULT";
    componentMode: ComponentMode = "WIDGET";
    statusMessage: string;

    constructor(private jobService: JobService, private router: Router) {
    }

    ngOnInit() {
        this.getJobs();
    }


    goToTrackingPage(jobId: string){
        this.router.navigateByUrl("/track/" + jobId);
    }

    getJobs() {
        this.jobs = new Array<Job>();
        this.jobService.getHistory()
            .subscribe((pagedJob) => {
                this.status = "SUCCESSFUL";
                this.jobs = pagedJob.data;
                if (!this.jobs.length) {
                    this.status = "EMPTY";
                    this.statusMessage = "It looks lonely here. Why don't you put an order?";
                }
            }, (error) => {
                this.statusMessage = error.Message || "Failed to fetch data from server";
                this.status = "FAILED";
            });
    }

    setJobStatusLabelClass(state: string) {
        switch (state) {
            case "COMPLETED":
                return "label label-success";
            case "ENQUEUED":
                return "label label-primary";
            case "IN_PROGRESS":
                return "label label-info";
            case "CANCELLED":
                return "label label-danger";
            default:
                break;
        }
    }

    setPaymentStatusLabelClass(state: string) {
        switch (state) {
            case "Pending":
                return "label label-primary";
            case "Authorized":
                return "label label-info";
            case "Paid":
                return "label label-success";
            case "PartiallyRefunded":
                return "label label-warning";
            case "Refunded":
                return "label label-danger";
            case "Voided":
                return "label label-default";
            default:
                break;
        }
    }
}
