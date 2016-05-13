import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
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

    public signupForm: ControlGroup;
    public username: Control = new Control("", Validators.required);
    public email: Control = new Control("", Validators.compose([Validators.required, Validators.pattern("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$")]));

    public password: Control = new Control("", Validators.compose([Validators.required, Validators.minLength(6)]));
    public cpassword: Control = new Control("", Validators.compose([Validators.required, Validators.minLength(6)]));

    public phone: Control = new Control("");

    ngOnInit() {
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: ControlGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

    constructor(private formBuilder: FormBuilder) {
        this.model = new UserRegistrationModel();

        this.signupForm = formBuilder.group({
            "username": this.username,
            "email": this.email,
            "phone": this.phone,
            "password": this.password,
            "cpassword": this.cpassword
        },{validator: this.matchingPasswords('password', 'cpassword')});
    }

    onSubmit() {
        this.submitted = true;
        console.log("registration form submitted");
        console.log(this.signupForm.valid);
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