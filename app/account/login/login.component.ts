
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HTTP_PROVIDERS } from '@angular/http';


import { ValidationService } from '../shared/validation.service';

@Component({
    selector: 'login',
    templateUrl: 'app/account/login/login.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ValidationService],
    styleUrls: ['app/account/login/login.component.css']
})
export class LoginComponent implements OnInit{

    ngOnInit(){

    }

    @ViewChild('modal')
    modal: ModalComponent;

    close(){
        this.modal.close();
    }

    open(){
        this.modal.open();
    }
}


