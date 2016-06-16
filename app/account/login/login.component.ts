import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router-deprecated';

import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HTTP_PROVIDERS } from '@angular/http';
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
    providers: [HTTP_PROVIDERS, ValidationService, LoginService]
})
export class LoginComponent implements OnInit {

    public loginForm: ControlGroup;
    public isFormActive = false;
    public loginModel: Login;

    ngOnInit() { }

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
        this.loginService.login(this.loginModel)
            .subscribe((result) => {
                if (result) {
                    this.close();
                    this.router.navigate(["Home"]);
                }
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

    }
}


