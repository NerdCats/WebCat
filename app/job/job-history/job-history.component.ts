import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS } from '@angular/http';

import {JobService} from '../shared/job.service';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {PageEnvelope} from '../../shared/pagination';
import {Job} from '../shared/job';

@Component({
    selector: 'job-history',
    templateUrl: 'app/job/job-history/job-history.component.html',
    providers: [JobService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
export class JobHistoryComponent {
    jobs: Array<Job>;
    constructor(private jobService: JobService) {

    }

    ngOnInit() {
        this.jobService.getHistory()
            .subscribe((pagedJob) => {
                this.jobs = pagedJob.data;
            });
    }
}