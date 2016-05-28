import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HTTP_PROVIDERS } from '@angular/http';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap';

import { UserRegistration } from '../shared/user.registration';
import { AccountService } from '../shared/account.service';
import { ValidationService } from '../shared/validation.service';
import { User } from '../shared/user';
import { AvailibilityResponse } from '../shared/availibilityResponse';
import { AppSettings } from  '../../shared/app.settings';

@Component({
    selector: 'signup',
    templateUrl: 'app/account/signup/signup.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent, TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS, AccountService]
})
export class SignupComponent implements OnInit {
    private errorMessage: string;
    private userModel: User;
    private usernameAvailableResult: AvailibilityResponse;
    private countryCode = "+880";

    public submitted = false;
    public submitCompleted = false;
    public submitResultMessage: string;

    public

    // Interested Locality Region
    public interestedLocalityControl: Control = new Control('');
    // Area Typeahead
    public localities: Array<string> = [
        'Mohakhali',
        'Mohammadpur'
    ];

    public registrationModel: UserRegistration;
    public signupForm: ControlGroup;

    ngOnInit() {
    }

    constructor(private formBuilder: FormBuilder,
        private accountService: AccountService,
        private validationService: ValidationService) {

        this.registrationModel = new UserRegistration();

        // TODO: This is definitely a hack, we need to make it more generic so we
        // can support multiple countries
        this.setDefaultValues();

        this.signupForm = formBuilder.group({
            "username": ['', Validators.required, validationService.usernameValidatorAsync],
            "email": [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern(validationService.emailFormat)
                ]),
                validationService.emailAvailibilityValidatorAsync
            ],
            "password": ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'interestedLocality': this.interestedLocalityControl
        });
    }

    public onLocalitySelect(e: any): void {
        // The only reason we are doing this like this is an
        // existing bug in Angular2 bootstrap
        // details is on https://github.com/valor-software/ng2-bootstrap/issues/463
        // If the bug is fixed please update the module and
        // use [ngFormControl] to bind to the control
        this.interestedLocalityControl.updateValue(e.item);

        // TODO: Need to add the selected locality in the registration
        this.registrationModel.InterestedLocalities = new Array<string>();
        this.registrationModel.InterestedLocalities.push(e.item);
    }

    // TODO: Shameless hack here
    setDefaultValues() {
        this.registrationModel.Address.City = "Dhaka";
        this.registrationModel.Address.Country = "Bangladesh";
    }

    onSubmit() {
        this.submitted = true;

        // TODO: Phone number hack, this is here until we move to all phone number generic
        if (this.registrationModel.PhoneNumber) {
            this.registrationModel.PhoneNumber = this.countryCode + this.registrationModel.PhoneNumber;
        }

        // INFO: Confirming password as the UI wouldnt have that now
        this.registrationModel.ConfirmPassword = this.registrationModel.Password;

        this.accountService.register(this.registrationModel)
            .subscribe(result => {
                this.userModel = result;
                this.submitResultMessage = "Please check your mail for account confirmation at " + this.userModel.Email + ".\n" + "In any case, you're already registered in " + AppSettings.APP_NAME;
                this.submitCompleted = true;
            },
            error => {
                this.submitResultMessage = error;
                this.submitCompleted = true;
            });

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

    onModalClosed() {
        this.resetForm();
    }

    onModelDismissed() {
        this.resetForm();
    }

    resetForm() {
        this.submitCompleted = false;
        this.submitted = false;
        this.submitResultMessage = "";
    }
}