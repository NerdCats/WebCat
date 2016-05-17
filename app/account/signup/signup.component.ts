import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HTTP_PROVIDERS } from '@angular/http';

import { UserRegistration } from '../shared/user.registration';
import { AccountService } from '../shared/account.service';
import { User } from '../shared/user';

@Component({
    selector: 'signup',
    templateUrl: 'app/account/signup/signup.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [HTTP_PROVIDERS, AccountService]
})
export class SignupComponent implements OnInit {
    public registrationModel: UserRegistration;
    public submitted = false;
    private errorMessage: string;
    private userModel: User;

    public signupForm: ControlGroup;
    public username: Control = new Control("", Validators.required);
    public email: Control = new Control("", Validators.compose([Validators.required, Validators.pattern("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$")]));

    public password: Control = new Control("", Validators.compose([Validators.required, Validators.minLength(6)]));
    public cpassword: Control = new Control("", Validators.compose([Validators.required, Validators.minLength(6), (c) => {
        if (c.value != this.password.value) {
            return {
                mismatchedPasswords: true
            };
        }
    }]));

    public phone: Control = new Control("");

    ngOnInit() {
    }

    constructor(private formBuilder: FormBuilder, private accountService: AccountService) {
        this.registrationModel = new UserRegistration();

        this.signupForm = formBuilder.group({
            "username": this.username,
            "email": this.email,
            "phone": this.phone,
            "password": this.password,
            "cpassword": this.cpassword
        });
    }

    onSubmit() {
        this.submitted = true;
        this.accountService.register(this.registrationModel)
            .subscribe(
            result => this.userModel = result,
            error => this.errorMessage = error
            );

        console.log("registration form submitted");
    }

    // Modal related section starts here
    @ViewChild('modal')
    modal: ModalComponent;

    close() {
        this.modal.close();
    }

    open() {
        this.modal.open();
    }
}