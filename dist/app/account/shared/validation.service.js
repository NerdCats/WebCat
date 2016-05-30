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
var account_service_1 = require('./account.service');
var ValidationService = (function () {
    function ValidationService(accountService) {
        this.accountService = accountService;
    }
    ValidationService.getValidatorErrorMessage = function (code) {
        var config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address',
            'emailTaken': 'Email already taken',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long',
            'usernameTaken': 'Username already taken',
            'phonenumberTaken': 'PhoneNumber already taken',
            'serverConnctionError': 'Failed connecting to server, please try again later'
        };
        return config[code];
    };
    //section password
    ValidationService.prototype.passwordValidator = function (control) {
        if (control.value != null && control.value.length < 6) {
            return { 'invalidPassword': true };
        }
        return null;
    };
    Object.defineProperty(ValidationService.prototype, "emailFormat", {
        // section email
        get: function () {
            return "^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$";
        },
        enumerable: true,
        configurable: true
    });
    ValidationService.prototype.emailFormatValidator = function (control) {
        var regex = new RegExp(this.emailFormat);
        if (regex.test(control.value)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    };
    ValidationService.prototype.emailAvailibilityValidatorAsync = function (control) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.accountService.check("email", control.value)
                .subscribe(function (result) {
                if (!result.IsAvailable) {
                    resolve({ 'emailTaken': true });
                }
                else {
                    resolve(null);
                }
            }, function (error) {
                resolve({ 'serverConnctionError': true });
            });
        });
    };
    //section username
    ValidationService.prototype.usernameValidatorAsync = function (control) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.accountService.check("username", control.value)
                .subscribe(function (result) {
                if (!result.IsAvailable) {
                    resolve({ 'usernameTaken': true });
                }
                else {
                    resolve(null);
                }
            }, function (error) {
                // TODO: I'm not sure resolving here this way is the
                // right thing to do, I might need to reject the promise
                // here
                resolve({ 'serverConnctionError': true });
            });
        });
    };
    //section phonenumber
    ValidationService.prototype.phonenumberAvailibilityValidatorAsync = function (control) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.accountService.check("phonenumber", control.value)
                .subscribe(function (result) {
                if (!result.IsAvailable) {
                    resolve({ 'phonenumberTaken': true });
                }
                else {
                    resolve(null);
                }
            }, function (error) {
                // TODO: Same as aforementioned one
                resolve({ 'serverConnctionError': true });
            });
        });
    };
    ValidationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [account_service_1.AccountService])
    ], ValidationService);
    return ValidationService;
}());
exports.ValidationService = ValidationService;

//# sourceMappingURL=validation.service.js.map
