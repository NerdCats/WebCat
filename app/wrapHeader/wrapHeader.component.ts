import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
@Component({
    selector: 'wrap-header',
    templateUrl: 'app/wrapHeader/wrapHeader.component.html',
    styleUrls: ['app/wrapHeader/wrapHeader.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class WrapHeaderComponent {

    constructor(private router: Router){

    }
    gotoSearchpage(){
        this.router.navigate(["Track", {jobId: "Job-U7GPB66G"}])
    }
}