import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, RouterOutlet, RouteConfig } from '@angular/router-deprecated';

import { GlimpseComponent } from './glimpse/glimpse.component';
import { OrderComponent } from '../order/order.component';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    directives: [ROUTER_DIRECTIVES, RouterOutlet, GlimpseComponent]
})
@RouteConfig([
    { path: '/glimpse', name: 'Glimpse', component: GlimpseComponent, useAsDefault: true },
    { path: '/order', name: 'Order', component: OrderComponent}
])
export class DashboardComponent implements OnInit {
    isSideBarOpen: boolean = true;

    constructor() { }

    ngOnInit() { }

    toggleSidebar() {
        this.isSideBarOpen = !this.isSideBarOpen;
    }
}