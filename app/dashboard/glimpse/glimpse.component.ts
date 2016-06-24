import { Component, OnInit } from '@angular/core';

import { JobHistoryComponent } from '../../job/job-history/job-history.component';
import { JobSummaryComponent } from '../../job/job-summary/job-summary.component';

@Component({
    selector: 'glimpse',
    templateUrl: 'app/dashboard/glimpse/glimpse.component.html',
    directives: [JobHistoryComponent, JobSummaryComponent]
})
export class GlimpseComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}