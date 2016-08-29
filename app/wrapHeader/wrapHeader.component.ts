import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/components/typeahead';

@Component({
    selector: 'wrap-header',
    templateUrl: 'app/wrapHeader/wrapHeader.component.html',
    styleUrls: ['app/wrapHeader/wrapHeader.component.css'],
    directives: [ROUTER_DIRECTIVES, TYPEAHEAD_DIRECTIVES]
})
export class WrapHeaderComponent {
    public selectedArea: string = '';
    public selectedItem: string = '';
    public trackJobForm: ControlGroup;
    public areas:string [] = ['Banani', 'Baridhara', 'Dhanmondi', 'Gulshan 1', 'Gulshan 2', 'Uttara'];

    public items:Array<string> = [
        'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
        'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
        'Chocolates', 'Flowers',
        'Electronics', 'TV'
    ];

    constructor(private router: Router,
    private trackJobFormBuilder: FormBuilder){
        this.trackJobForm = this.trackJobFormBuilder.group({
            jobid: [""]
        })


    }

    goToVendorList(area:string){
        this.router.navigateByUrl("/vendors");
    }

    gotoSearchpage(event){
        this.router.navigate(["Track", {jobId: this.trackJobForm.value.jobid}]);
        event.preventDefault();
    }

    gotoSearchResultPage(e: any) {
        console.log(this.selectedItem);
    }

    public typeaheadOnSelect(e: any) {
        console.log('Selected item: ', e.item);
    }
}
