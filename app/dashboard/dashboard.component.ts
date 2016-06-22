import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class DashboardComponent implements OnInit {
    isSideBarOpen: boolean = true;

    constructor() { }

    ngOnInit() { }

    toggleSidebar() {
        this.isSideBarOpen = !this.isSideBarOpen;
    }

}