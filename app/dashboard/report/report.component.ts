import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ReportService } from './report.service';


@Component({
    selector: 'report',
    templateUrl: 'app/dashboard/report/report.component.html',
    styleUrls: ['app/dashboard/report/report.compoent.csee'],
    providers: [ReportService]
})


export class ReportComponent implements OnInit {

    ngOnInit(){

    }


}