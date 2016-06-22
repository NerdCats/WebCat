import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HTTP_PROVIDERS } from '@angular/http';
import { Router, RouteParams } from '@angular/router-deprecated';

import { JobService } from '../shared/job.service';
import { Job, JobState } from '../shared/job';
import {ComponentServiceStatus} from '../../shared/component-service-status';

@Component({
    selector: 'job-track',
    templateUrl: 'app/job/job-track/job-track.component.html',
    styleUrls: ['app/job/job-track/job-track.component.css'],
    providers: [ HTTP_PROVIDERS, JobService ]
})


export class JobTrackComponent implements OnInit{

    public jobId = "asdasdasd";
    public job: Job;
    status: ComponentServiceStatus = "IN_PROGRESS";
    public errorMessage = "";
    constructor(private params: RouteParams,
                private jobService: JobService){
        this.jobId = params.get('jobId');
    }
    ngOnInit(){
        this.getJob();
    }

    getJob(){
        this.jobService.getJob(this.jobId)
            .subscribe((job) => {
                this.status = "SUCCESSFUL";
                this.job = job;
                console.log(this.job);
            },
            (error) => {
                this.errorMessage = error.Message;
                this.status = "FAILED";
                console.log(this.errorMessage);
            });
    }

}