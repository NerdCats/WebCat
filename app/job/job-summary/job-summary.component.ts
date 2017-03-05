import { Component, OnInit } from '@angular/core';

import {ComponentServiceStatus} from '../../shared/component-service-status';

import {ProgressBubbleComponent} from '../../common/progress-bubble/progress-bubble.component';
import {WidgetHeaderComponent} from '../../common/widget-header/widget-header.component';
import {WidgetBodyComponent} from '../../common/widget-body/widget-body.component';

import {JobService} from '../shared/job.service';
import {CssHelper} from '../../shared/css-helper';
import {Job, JobState} from '../shared/job';


@Component({
    selector: 'job-summary',
    templateUrl: 'app/job/job-summary/job-summary.component.html',
    directives: [ProgressBubbleComponent, WidgetBodyComponent, WidgetHeaderComponent],
    styleUrls: ['app/job/job-summary/job-summary.component.css'],
    providers: [JobService]
})
export class JobSummaryComponent implements OnInit {
    jobCount = {
        COMPLETED: 0,
        IN_PROGRESS: 0,
        CANCELLED: 0,
        ENQUEUED: 0,
        RETURNED: 0,
        ALL: 0
    };

    jobCountProcessState = {
        COMPLETED: "PENDING",
        IN_PROGRESS: "PENDING",
        CANCELLED: "PENDING",
        ENQUEUED: "PENDING",
        RETURNED: "RETURNED"
    };

    public get status(): ComponentServiceStatus {
        if (Object.keys(this.jobCountProcessState).every(x => this.jobCountProcessState[x] == "SUCCESSFUL")) {
            return "SUCCESSFUL";
        }
        else if (Object.keys(this.jobCountProcessState).findIndex(x => this.jobCountProcessState[x] == "FAILED") >= 0) {
            return "FAILED";
        }
        else {
            return "IN_PROGRESS";
        }
    }

    statusMessage: string;

    constructor(private jobService: JobService) { }

    ngOnInit() {
        this.getAllJobCount();
    }

    getAllJobCount(){
        this.getJobCount("COMPLETED");
        this.getJobCount("IN_PROGRESS");
        this.getJobCount("ENQUEUED");
        this.getJobCount("CANCELLED");
        this.getJobCount("RETURNED");
        this.getJobCount("ALL");
    }

    getJobCount(state: JobState) {
        this.jobCountProcessState[state] = "IN_PROGRESS";
        this.jobService.getJobsByState(state)
            .subscribe((pagedJob) => {
                this.jobCountProcessState[state] = "SUCCESSFUL";
                this.jobCount[state] = pagedJob.pagination.Total;
            }, (error) => {
                this.jobCountProcessState[state] = "FAILED";
                this.statusMessage = error.Message || "Failed to fetch data from server";
            });
    }

    getStateCssClass(word: string):any {
        return CssHelper.getCssLabel(word);
    }
}