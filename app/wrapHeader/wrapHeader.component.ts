import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/components/typeahead';
import { WrapHeaderService } from './wrapHeader.service';

@Component({
    selector: 'wrap-header',
    templateUrl: 'app/wrapHeader/wrapHeader.component.html',
    styleUrls: ['app/wrapHeader/wrapHeader.component.css'],
    directives: [ROUTER_DIRECTIVES, TYPEAHEAD_DIRECTIVES],
    providers: [WrapHeaderService]
})

export class WrapHeaderComponent {
    public selectedArea: string = "";
    public selectedItem: string;

    public areas:string [] = this.wrapHeaderService.WrapHeaderDetails.areas;

    public items:string[] = this.wrapHeaderService.WrapHeaderDetails.items;

    constructor(private router: Router, private wrapHeaderService: WrapHeaderService){}

    goToVendorList(area:string){
        this.router.navigateByUrl("/vendors");
    }



    gotoSearchResultPage(e) {
        console.log("Area: " + this.selectedArea + ", Item: " + this.selectedItem);
        console.log("/search/" + this.selectedArea + "/" + this.selectedItem);

        this.router.navigateByUrl("/search/" + this.selectedArea + "/" + this.selectedItem);
    }

    public typeaheadOnSelect(e: any) {
        console.log('Selected item: ', e.item);
    }
}
