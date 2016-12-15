import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import {JobService} from '../shared/job.service';
import {Job} from '../shared/job';
import {JobTask} from '../shared/jobtasks';
import {Pagination} from '../../shared/pagination';
import {CssHelper} from '../../shared/css-helper';

import {ComponentServiceStatus} from '../../shared/component-service-status';

import {ProgressBubbleComponent} from '../../common/progress-bubble/progress-bubble.component';
import {WidgetHeaderComponent} from '../../common/widget-header/widget-header.component';
import {WidgetBodyComponent} from '../../common/widget-body/widget-body.component';

export type AccessMode = "DEFAULT" | "ADMIN";
export type ComponentMode = "WIDGET" | "FULL";

@Component({
    selector: 'job-history',
    templateUrl: 'app/job/job-history/job-history.component.html',
    styleUrls: ['app/job/job-history/job-history.component.css'],
    directives: [ProgressBubbleComponent, WidgetHeaderComponent, WidgetBodyComponent],
    providers: [JobService]
})
export class JobHistoryComponent implements OnInit {
    @Input()
    set cmode(componentMode: ComponentMode) {
        this.componentMode = componentMode || "WIDGET";
    }

    jobs: Array<Job> = new Array<Job>();;
    jobState: string = "ALL";
    paymentStatus: string = "ALL";
    status: ComponentServiceStatus = "IN_PROGRESS";
    accessMode: AccessMode = "DEFAULT";
    componentMode: ComponentMode = "WIDGET";
    statusMessage: string;
    pagination: Pagination;
    paginationArray: Object[];

    constructor(private jobService: JobService, private router: Router) {
    }

    ngOnInit() {
        this.getJobsWithPageNumber("ALL", "ALL", 0);
    }

    jobStateChange(){
        this.getJobsWithPageNumber(this.jobState, this.paymentStatus, 0);
    }

    getJobsWithPageNumber(jobState:string, paymentStatus:string, page: number){
        this.status = "IN_PROGRESS";
        if(paymentStatus !== "ALL") {
            jobState = "ALL";
            this.jobState  = "ALL";
        }
        if(page > 0) page = 0;
        if(this.pagination && page >= this.pagination.TotalPages) page = this.pagination.TotalPages;

        this.jobService.getHistoryWithPageNumber(jobState, paymentStatus, page)
            .subscribe((pagedJob) => {
                this.manageHistory(pagedJob)
            },(error) => {
                this.manageError(error);
            })
    }

    private manageHistory(pagedJob){
        this.status = "SUCCESSFUL";
        this.jobs = pagedJob.data;
        this.pagination = pagedJob.pagination;

        // FIXME: This is an ugly code I confess
        this.paginationArray = new Array();
        for (var i = 0; i < pagedJob.pagination.TotalPages; i++) {
            let page = { isSelected: "", pageNo: i }
            if (pagedJob.pagination.Page == i) {
                page.isSelected = "selected"
            }
            this.paginationArray.push(page);
        }

        if (!this.jobs.length) {
            this.status = "EMPTY";
            this.statusMessage = "It looks lonely here. Why don't you put an order?";
        }
    }
    private manageError(error){
        this.statusMessage = error.Message || "Failed to fetch data from server";
        this.status = "FAILED";
    }

    getTasksState(task: JobTask){
        if(task === undefined)
            return CssHelper.getCssLabel("N/A");
        else
            return CssHelper.getCssLabel(task.State);
    }

    setJobStatusLabelClass(state: string) {
        return CssHelper.getCssLabel(state);
    }

    setPaymentStatusLabelClass(state: string) {
        return CssHelper.getCssLabel(state);
    }
}
