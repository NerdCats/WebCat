import { Component, ViewChild, OnInit } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'signup',
    templateUrl: 'app/auth/signup/signup.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent]
})
export class SignupComponent implements OnInit {
    constructor() {
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
}