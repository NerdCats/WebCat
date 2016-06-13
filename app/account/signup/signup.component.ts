import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Control, ControlGroup, Validators, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HTTP_PROVIDERS } from '@angular/http';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/components/typeahead';

import { ControlMessage } from './control-message.component';
import { UserRegistrationBase } from '../shared/user-registration-base';
import { UserRegistration } from '../shared/user-registration';
import { EnterpriseUserRegistration } from '../shared/enterprise-user-registration';
import { AccountService } from '../shared/account.service';
import { ValidationService } from '../shared/validation.service';
import { LocalityService } from '../../shared/app-locality.service';
import { User } from '../shared/user';
import { AvailibilityResponse } from '../shared/availibility-response';
import { AppSettings } from  '../../shared/app.settings';
import { UserTypes } from '../shared/user-types';

import { NcShowPassword } from '../shared/nc-show-password.directive';
@Component({
    selector: 'signup',
    templateUrl: 'app/account/signup/signup.component.html',
    directives: [MODAL_DIRECTIVES, ModalComponent, TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, ControlMessage, NcShowPassword],
    providers: [HTTP_PROVIDERS, AccountService, ValidationService, LocalityService],
    styleUrls: ['app/account/signup/signup.component.css']
})
export class SignupComponent implements OnInit {
    private errorMessage: string;
    private userModel: User;
    private usernameAvailableResult: AvailibilityResponse;

    public selectedUserType: any = false;
    public submitted = false; // INFO: Submit button is pressed
    public submitCompleted = false; // INFO: Whole submit process is completed
    public submitResultMessage: string;
    public isFormActive = false;

    // Area Typeahead
    // TODO: For some weird reason typeahead doesnt work without an ngModel
    // if anyone finds a solution please fix this
    public localityQuery: string;
    public localities: Array<string>;

    public registrationModel: UserRegistrationBase;
    public signupForm: ControlGroup;

    public interestedLocality: Control = new Control("", Validators.required);

    ngOnInit() {
        this.localities = this.localityService.getLocalities();
    }

    constructor(private formBuilder: FormBuilder,
        private accountService: AccountService,
        private validationService: ValidationService,
        private localityService: LocalityService) {

        this.initiateForm();
    }

    initiateForm() {
        // TODO: This is definitely a hack, we need to make it more generic so we
        // can support multiple countries
        let baseControls = {
            "username": ['', Validators.required, (c) => { return this.validationService.usernameValidatorAsync(c); }],
            "email": [
                '',
                Validators.compose([
                    Validators.required,
                    (c) => { return this.validationService.emailFormatValidator(c); }
                ]),
                (c) => { return this.validationService.emailAvailibilityValidatorAsync(c); }
            ],
            "password": ['', Validators.compose([Validators.required, (c) => { return this.validationService.passwordValidator(c); }])],
            "phonenumber": ['', Validators.required, (c) => { return this.validationService.phonenumberAvailibilityValidatorAsync(c) }]
        };

        this.signupForm = this.formBuilder.group(baseControls);
    }

    onLocalitySelect(e: any): void {
        // The only reason we are doing this like this is an
        // existing bug in Angular2 bootstrap
        // details is on https://github.com/valor-software/ng2-bootstrap/issues/463
        // If the bug is fixed please update the module and
        // use [ngFormControl] to bind to the control
        this.interestedLocality.updateValue(e.item);
        if (this.registrationModel.Type == UserTypes.TYPE_USER) {
            // TODO: Need to add the selected locality in the registration
            let interestedLocality = new Array<string>();
            interestedLocality.push(e.item);
            (<UserRegistration>this.registrationModel).InterestedLocalities = interestedLocality;
        }
    }

    onSelectUser(): void {
        this.isFormActive = true;
        this.selectedUserType = UserTypes.TYPE_USER;
        this.registrationModel = new UserRegistration();
        this.signupForm.addControl('interestedLocality', this.interestedLocality);
    }

    onSelectEnterpriseUser(): void {
        this.isFormActive = true;
        this.registrationModel = new EnterpriseUserRegistration();
        this.selectedUserType = UserTypes.TYPE_ENTERPRISE;
    }

    onBackPressed(): void {
        this.selectedUserType = false;
        this.resetForm();
    }

    onSubmit() {
        this.submitted = true;
        // INFO: Confirming password as the UI wouldnt have that now
        this.registrationModel.ConfirmPassword = this.registrationModel.Password;
        console.log(this.registrationModel);

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

        this.isFormActive = false;
        setTimeout(()=> this.isFormActive=true, 0);
    }
}