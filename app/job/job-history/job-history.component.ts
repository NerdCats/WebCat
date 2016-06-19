import {Component, OnInit} from '@angular/core';
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
export class JobHistoryComponent implements OnInit {
    jobs: Array<any> = new Array<any>();

    constructor(private jobService: JobService) {
    }

    ngOnInit() {
        this.getJobs();
    }

    getJobs() {
        this.jobs = new Array<any>();
        this.jobService.getHistory()
            .subscribe((pagedJob) => {
                this.jobs = pagedJob.data;
            });
    }
}

