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
    pageNo: number;
    pageCount: number = 20;
    pagination: Pagination;
    paginationArray: Object[];
    prevPageNo: number;
    nextPageNo: number;

    startTime: Date;
    endTime: Date;

    orderBy: string;
    orderByTime: string = "ModifiedTime";
    orderByTimeDirection: string = "desc";

    filterTime: string = "CreateTime";

    searchText: string;



    constructor(private jobService: JobService, private router: Router) {
    }

    ngOnInit() {
        this.search();
    }

    orderByTimeWithDirection(orderByTime: string, orderByTimeDirection: string){
        this.orderByTime = orderByTime;
        this.orderByTimeDirection = orderByTimeDirection;
        this.search();
    }

    search(){
        this.getJobsWithPageNumber(this.jobState,
                                    this.paymentStatus, 0, this.pageCount,
                                    this.startTime, this.endTime,
                                    this.searchText, this.orderBy,
                                    this.orderByTime, this.orderByTimeDirection, this.filterTime)
    }

    loadPage(pageNo: number){
        this.getJobsWithPageNumber(this.jobState,
                                    this.paymentStatus, pageNo, this.pageCount,
                                    this.startTime, this.endTime,
                                    this.searchText, this.orderBy,
                                    this.orderByTime, this.orderByTimeDirection, this.filterTime)
    }

    clearDate(){
        this.startTime = null;
        this.endTime = null;
        this.search();
    }

    getJobsWithPageNumber(jobState:string,
                        paymentStatus:string,
                        page: number, pageCount:number,
                        startTime: Date, endTime: Date,
                        reference: string = null,
                        orderBy: string, orderByTime: string, orderByTimeDirection: string,
                        filterTime: string){
        this.status = "IN_PROGRESS";
        let startTimeISO:string;
        let endTimeISO:string;
        if(paymentStatus !== "ALL") {
            jobState = "ALL";
            this.jobState  = "ALL";
        }

        if(page < 0) page = 0;
        if(this.pagination && page >= this.pagination.TotalPages) page = this.pagination.TotalPages;

        if(startTime){
            startTime = new Date(startTime);
            startTimeISO = startTime? new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 0, 0, 0).toISOString() : null;
        }

        if(endTime){
            endTime = new Date(endTime);
            endTimeISO = endTime? new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), 23, 59, 59).toISOString() : null;
        }

        this.jobService.getHistoryWithPageNumber(jobState,
                                                paymentStatus,
                                                page, pageCount,
                                                startTimeISO, endTimeISO,
                                                reference,
                                                orderBy, orderByTime, orderByTimeDirection,
                                                filterTime)
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
        let currentPageIndex = pagedJob.pagination.Page

        // FIXME: This is an ugly code I confess
        this.paginationArray = new Array();
        for (var i = 0; i < pagedJob.pagination.TotalPages; i++) {
            let page = { isSelected: "", pageNo: i , show: false}
            if(i > (currentPageIndex-5) && i < (currentPageIndex + 5)){
                if (currentPageIndex == i) {
                    page.isSelected = "selected";
                }
                if(pagedJob.pagination.TotalPages > i){
                    this.prevPageNo = currentPageIndex - 1;
                }
                if(pagedJob.pagination.TotalPages > 0){
                    this.nextPageNo = currentPageIndex + 1;
                }
                this.paginationArray.push(page);
            }
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

    getJobStateCSS(taskState: string){
        if(taskState === undefined)
            return CssHelper.getCssLabel("N/A");
        else
            return CssHelper.getCssLabel(taskState);
    }

    setJobStatusLabelClass(state: string) {
        return CssHelper.getCssLabel(state);
    }

    setPaymentStatusLabelClass(state: string) {
        return CssHelper.getCssLabel(state);
    }
}
