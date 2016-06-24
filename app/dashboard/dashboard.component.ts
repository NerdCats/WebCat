import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouteConfig } from '@angular/router-deprecated';

import { JobHistoryComponent } from '../job/job-history/job-history.component';
import { JobSummaryComponent } from '../job/job-summary/job-summary.component';
import { OrderComponent } from '../order/order.component';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    directives: [RouterOutlet, JobHistoryComponent, JobSummaryComponent]
})
@RouteConfig([
    { path: '/', name: 'order', component: OrderComponent, useAsDefault: true }
])
export class DashboardComponent implements OnInit {
    isSideBarOpen: boolean = true;

    constructor() { }

    ngOnInit() { }

    toggleSidebar() {
        this.isSideBarOpen = !this.isSideBarOpen;
    }
}