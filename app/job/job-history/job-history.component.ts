import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS } from '@angular/http';

import {JobService} from '../shared/job.service';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {PageEnvelope} from '../../shared/pagination';
import {Job, JobState} from '../shared/job';

import {ComponentServiceStatus} from '../../shared/component-service-status';

@Component({
    selector: 'job-history',
    templateUrl: 'app/job/job-history/job-history.component.html',
    providers: [JobService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
export class JobHistoryComponent implements OnInit {
    jobs: Array<any> = new Array<any>();
    status: ComponentServiceStatus = "IN_PROGRESS";

    constructor(private jobService: JobService) {
    }

    ngOnInit() {
        this.getJobs();
    }

    getJobs() {
        this.jobs = new Array<any>();
        this.jobService.getHistory()
            .subscribe((pagedJob) => {
                this.status = "SUCCESSFUL";
                this.jobs = pagedJob.data;
            }, (error) => {
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
