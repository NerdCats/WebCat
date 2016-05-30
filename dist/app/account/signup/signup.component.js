"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var http_1 = require('@angular/http');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var control_message_component_1 = require('./control-message.component');
var user_registration_1 = require('../shared/user.registration');
var account_service_1 = require('../shared/account.service');
var validation_service_1 = require('../shared/validation.service');
var app_locality_service_1 = require('../../shared/app-locality.service');
var app_settings_1 = require('../../shared/app.settings');
var SignupComponent = (function () {
    function SignupComponent(formBuilder, accountService, validationService, localityService) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.accountService = accountService;
        this.validationService = validationService;
        this.localityService = localityService;
        this.submitted = false;
        this.submitCompleted = false;
        this.interestedLocality = new common_1.Control("", common_1.Validators.required);
        this.registrationModel = new user_registration_1.UserRegistration();
        // TODO: This is definitely a hack, we need to make it more generic so we
        // can support multiple countries
        this.signupForm = formBuilder.group({
            "username": ['', common_1.Validators.required, function (c) { return _this.validationService.usernameValidatorAsync(c); }],
            "email": [
                '',
                common_1.Validators.compose([
                    common_1.Validators.required,
                    function (c) { return _this.validationService.emailFormatValidator(c); }
                ]),
                function (c) { return _this.validationService.emailAvailibilityValidatorAsync(c); }
            ],
            "password": ['', common_1.Validators.compose([common_1.Validators.required, function (c) { return _this.validationService.passwordValidator(c); }])],
            'interestedLocality': this.interestedLocality
        });
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.localities = this.localityService.getLocalities();
    };
    SignupComponent.prototype.onLocalitySelect = function (e) {
        // The only reason we are doing this like this is an
        // existing bug in Angular2 bootstrap
        // details is on https://github.com/valor-software/ng2-bootstrap/issues/463
        // If the bug is fixed please update the module and
        // use [ngFormControl] to bind to the control
        this.interestedLocality.updateValue(e.item);
        // TODO: Need to add the selected locality in the registration
        this.registrationModel.InterestedLocalities = new Array();
        this.registrationModel.InterestedLocalities.push(e.item);
    };
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // INFO: Confirming password as the UI wouldnt have that now
        this.registrationModel.ConfirmPassword = this.registrationModel.Password;
        this.accountService.register(this.registrationModel)
            .subscribe(function (result) {
            _this.userModel = result;
            _this.submitResultMessage = "Please check your mail for account confirmation at " + _this.userModel.Email + ".\n" + "In any case, you're already registered in " + app_settings_1.AppSettings.APP_NAME;
            _this.submitCompleted = true;
        }, function (error) {
            _this.submitResultMessage = error;
            _this.submitCompleted = true;
        });
        console.log("registration form submitted");
    };
    SignupComponent.prototype.close = function () {
        this.modal.close();
    };
    SignupComponent.prototype.open = function () {
        this.modal.open();
    };
    SignupComponent.prototype.onModalClosed = function () {
        this.resetForm();
    };
    SignupComponent.prototype.onModelDismissed = function () {
        this.resetForm();
    };
    SignupComponent.prototype.resetForm = function () {
        this.submitCompleted = false;
        this.submitted = false;
        this.submitResultMessage = "";
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], SignupComponent.prototype, "modal", void 0);
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: 'app/account/signup/signup.component.html',
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES, ng2_bs3_modal_1.ModalComponent, ng2_bootstrap_1.TYPEAHEAD_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, control_message_component_1.ControlMessage],
            providers: [http_1.HTTP_PROVIDERS, account_service_1.AccountService, validation_service_1.ValidationService, app_locality_service_1.LocalityService]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, account_service_1.AccountService, validation_service_1.ValidationService, app_locality_service_1.LocalityService])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;

//# sourceMappingURL=signup.component.js.map
