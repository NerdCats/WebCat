import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, RouterOutlet, RouteConfig } from '@angular/router-deprecated';

import { GlimpseComponent } from './glimpse/glimpse.component';
import { OrderComponent } from './order/order.component';

import { DashboardBusService } from './dashboard-bus.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    directives: [ROUTER_DIRECTIVES, RouterOutlet, GlimpseComponent],
    providers: [DashboardBusService]
})
@RouteConfig([
    { path: '/glimpse', name: 'Glimpse', component: GlimpseComponent, useAsDefault: true },
    { path: '/order', name: 'Order', component: OrderComponent }
])
export class DashboardComponent implements OnInit {
    isSideBarOpen: boolean = true;
    sectionName: string;

    constructor(private busService: DashboardBusService) {
        this.busService.sectionChangeAnnounced$.subscribe(newSectionName => {
            this.sectionName = newSectionName;
            console.log("bus : " + newSectionName);

        })
    }

    ngOnInit() { }

    toggleSidebar() {
        this.isSideBarOpen = !this.isSideBarOpen;
    }
}