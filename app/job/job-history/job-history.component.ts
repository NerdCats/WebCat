import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS } from '@angular/http';

import {JobService} from '../shared/job.service';
import { ROUTER_PROVIDERS} from '@angular/router-deprecated';

@Component({
    selector: 'job-history',
    templateUrl: 'app/job/job-history/job-history.component.html',
    providers: [JobService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
export class JobHistoryComponent {

    ngOnInit() { }

    constructor(private jobService: JobService) {
        this.jobService.getHistory()
            .subscribe(x => console.log(x));
    }
}