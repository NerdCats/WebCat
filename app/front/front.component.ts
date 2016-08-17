import { Component, OnInit } from "@angular/core";
import { FrontService } from "./front.service"

@Component({
    selector: 'front',
    templateUrl: 'app/front/front.component.html',
    styleUrls: ['app/front/front.component.css'],
    providers: [FrontService]
})

export class FrontComponent implements OnInit {
    front: any;

    ngOnInit(){
        this.front = this.frontDetailsService.frontDetails;
    }

    constructor( private frontDetailsService: FrontService){

    }

}