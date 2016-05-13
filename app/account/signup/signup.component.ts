import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/common';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { UserRegistrationModel } from '../shared/user.registration.model';

@Component({
    selector: 'signup',
    templateUrl: 'app/account/signup/signup.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent]
})
export class SignupComponent implements OnInit {
    public model: UserRegistrationModel;
    public submitted = false;

    constructor() {
        this.model = new UserRegistrationModel();
     }

    ngOnInit() {
    }

    @ViewChild('modal')
    modal: ModalComponent;

    close() {
        this.modal.close();
    }

    open() {
        this.modal.open();
    }

    onsubmit()
    {
        this.submitted = true;
    }
}