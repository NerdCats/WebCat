import { Component, OnInit } from '@angular/core';

import {ProgressBubbleComponent} from '../../common/progress-bubble/progress-bubble.component';
import {WidgetHeaderComponent} from '../../common/widget-header/widget-header.component';
import {WidgetBodyComponent} from '../../common/widget-body/widget-body.component';

import {JobService} from '../shared/job.service';
import {Job} from '../shared/job';

@Component({
    selector: 'job-summary',
    templateUrl: 'app/job/job-summary/job-summary.component.html',
    directives: [ProgressBubbleComponent, WidgetBodyComponent, WidgetHeaderComponent],
    styleUrls: ['app/job/job-summary/job-summary.component.css']
})
export class JobSummaryComponent implements OnInit {
    completedJobCount: number;
    inprogressJobCount: number;
    pendingJobCount: number;
    cancelledJobCount: number;

    constructor() { }

    ngOnInit() { }
}