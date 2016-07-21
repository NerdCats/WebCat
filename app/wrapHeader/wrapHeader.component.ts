import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
@Component({
    selector: 'wrap-header',
    templateUrl: 'app/wrapHeader/wrapHeader.component.html',
    styleUrls: ['app/wrapHeader/wrapHeader.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class WrapHeaderComponent {
    public trackJobForm: ControlGroup;

    constructor(private router: Router,
    private trackJobFormBuilder: FormBuilder){
        this.trackJobForm = this.trackJobFormBuilder.group({
            jobid: [""]
        })


    }
    gotoSearchpage(event){
        this.router.navigate(["Track", {jobId: this.trackJobForm.value.jobid}]);
        event.preventDefault();
    }
}