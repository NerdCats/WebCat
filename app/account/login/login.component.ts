import { Component, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router-deprecated';

import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable } from 'rxjs/Observable';

import { Login } from './login'
import { ValidationService } from '../shared/validation.service';
import { LoginService } from './login.service';
import { NcShowPassword } from '../shared/nc-show-password.directive';

import { AppSettings } from '../../shared/app.settings';

@Component({
    selector: 'login',
    templateUrl: 'app/account/login/login.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, NcShowPassword],
    providers: [ValidationService, LoginService]
})
export class LoginComponent {

    public loginForm: ControlGroup;
    public isFormActive = false;
    public loginModel: Login;

    public submitted = false; // INFO: Submit button is pressed
    public submitCompleted = false; // INFO: Whole submit process is completed
    public loginFailed = false;
    public submitResultMessage: string = "";

    constructor(private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router) {
        this.loginModel = new Login("password", AppSettings.CLIENT_ID);
        this.initiateForm();
    }

    initiateForm() {
        let loginControls = {
            "username": ['', Validators.required],
            "password": ['', Validators.required]
        };
        this.loginForm = this.formBuilder.group(loginControls);
    }

    onSubmit() {
        this.submitted = true;
        this.submitCompleted = false;
        this.loginFailed = false;
        this.submitResultMessage = "";
        this.loginService.login(this.loginModel)
            .subscribe((result) => {
                this.submitCompleted = true;
                this.close();
                this.router.navigate(["Home"]);
            },
            (error)=>{
                this.loginFailed = true;
                this.submitCompleted = true;
                this.submitResultMessage = error;
            });
    }

    @ViewChild('modal')
    modal: ModalComponent;

    close() {
        this.modal.close();
    }

    open() {
        this.modal.open();
    }

    onModalClosed() {
        this.resetForm();
    }

    onModalDismissed() {
        this.resetForm();
    }

    resetForm() {
        this.submitted = false;
        this.loginFailed = false;
        this.submitResultMessage = "";
        this.loginModel.UserName = "";
        this.loginModel.Password = "";
    }
}


