
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router-deprecated';

import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Login } from '../shared/login'

import { ValidationService } from '../shared/validation.service';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: 'app/account/login/login.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ValidationService, LoginService],
    styleUrls: ['app/account/login/login.component.css']
})
export class LoginComponent implements OnInit{

    public loginForm: ControlGroup;
    public isFormActive = false;
    public loginModel: Login;
    ngOnInit(){

    }

    /**
     *
     */
    constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router) {
        this.loginModel = new Login();
        this.initiateForm();
    }

    initiateForm(){
        let loginControls = {
            "username": ['', Validators.required],
            "password": ['', Validators.required],
            "grant_type": [this.loginModel.GrantType],
            "client_id": [this.loginModel.ClientId]
        };
        this.loginForm = this.formBuilder.group(loginControls);
    }

    onSubmit(){
        this.loginService.login(this.loginForm.value)
        .subscribe((result)=>{
            if (result) {
                console.log(result);
                console.log("Navigate: ")
                // this.router.navigate(['Home']);
            }
        });

    }

    @ViewChild('modal')
    modal: ModalComponent;

    close(){
        this.modal.close();
    }

    open(){
        this.modal.open();
    }

    onModalClosed(){
        this.resetForm();
    }

    onModalDismissed(){
        this.resetForm();
    }

    resetForm(){

    }
}


