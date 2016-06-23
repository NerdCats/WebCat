import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { JobHistoryComponent } from '../job/job-history/job-history.component';
import { JobSummaryComponent } from '../job/job-summary/job-summary.component';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    directives: [ROUTER_DIRECTIVES, JobHistoryComponent, JobSummaryComponent]
})
export class DashboardComponent implements OnInit {
    isSideBarOpen: boolean = true;

    constructor() { }

    ngOnInit() { }

    toggleSidebar() {
        this.isSideBarOpen = !this.isSideBarOpen;
    }
}