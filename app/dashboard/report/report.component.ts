import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ReportService } from './report.service';


import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import { DashboardBusService } from '../dashboard-bus.service';
@Component({
    selector: 'report',
    templateUrl: 'app/dashboard/report/report.component.html',
    styleUrls: ['app/dashboard/report/report.component.css'],
    providers: [ReportService],
    directives: [TimepickerComponent, DATEPICKER_DIRECTIVES],
})


export class ReportComponent implements OnInit {

    startHour: number = 0;
    startMin: number = 0;
    startSec: number = 0;
    startTime: Date = new Date();

    endHour: number = 23;
    endMin: number = 59;
    endSec: number = 59;
    endTime: Date = new Date();

    ngOnInit(){

    }

    constructor(private busService: DashboardBusService, private reportService: ReportService) {
        this.busService.annouceSectionChange("Report");
    }

    generateReport(){
        let _startTime = this.getIsoDate(this.startTime, this.startHour, this.startMin, this.startSec);
        let _endTime = this.getIsoDate(this.endTime, this.endHour, this.endMin, this.endSec);

        this.reportService.getReport(_startTime, _endTime);
    }
    getIsoDate(date, hour, min, sec) {
        console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min, sec));

		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min, sec).toISOString();
	}


}