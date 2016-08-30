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
    public selectedArea: string;
    public selectedItem: string;

    public areas:string [] = ['','Banani', 'Baridhara', 'Dhanmondi', 'Gulshan 1', 'Gulshan 2', 'Uttara'];

    public items:string[] = [
        'Coffee', 'Tea', 'Coca Cola', 'Pepsi', 'Fanta',
        'Cake', 'Pastry', 'Almond', 'Rice', 'Flour',
        'Chocolates', 'Flowers',
        'Electronics', 'TV'
    ];

    constructor(private router: Router){}

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
