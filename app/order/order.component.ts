import { Component } from '@angular/core';
// import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';


@Component({
    selector: 'order',
    templateUrl: 'app/order/order.component.html'
    // directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class OrderComponent{
    constructor() {
        console.log("here");
    }
}