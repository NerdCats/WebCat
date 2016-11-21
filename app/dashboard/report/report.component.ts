import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ReportService } from './report.service';


import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'report',
    templateUrl: 'app/dashboard/report/report.component.html',
    styleUrls: ['app/dashboard/report/report.component.css'],
    providers: [ReportService],
    directives: [TimepickerComponent, DATEPICKER_DIRECTIVES],
})


export class ReportComponent implements OnInit {

    pickupTime: Date = new Date();
    ngOnInit(){

    }


}