import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Validators } from '@angular/common';

import { ValidationError } from './validationError';
import { AccountService } from './account.service';

@Injectable()
export class ValidationService {

    constructor(private accountService: AccountService) {

    }

    static getValidatorErrorMessage(code: string) {
        let config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long',
            'usernameTaken': 'UserName is already taken',
            'phonenumberTaken' : 'PhoneNumber is already taken',
            'serverConnctionError': 'Failed connecting to server, please try again later'
        };
        return config[code];
    }

    get emailFormat() {
        return "^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$";
    }

    emailAvailibilityValidatorAsync(control): Promise<ValidationError> {
        return new Promise(resolve => {
            this.accountService.check("email", control.value)
                .subscribe(result => {
                    if (!result.IsAvailable) {
                        resolve({ 'emailTaken': true });
                    }
                    else {
                        resolve(null);
                    }
                }, error => {
                    resolve({ 'serverConnctionError': true });
                });
        });
    }

    usernameValidatorAsync(control): Promise<ValidationError> {
        return new Promise(resolve => {
            this.accountService.check("username", control.value)
                .subscribe(result => {
                    if (!result.IsAvailable) {
                        resolve({ 'usernameTaken': true });
                    }
                    else {
                        resolve(null);
                    }
                },
                error => {
                    // TODO: I'm not sure resolving here this way is the
                    // right thing to do, I might need to reject the promise
                    // here
                    resolve({ 'serverConnctionError': true });
                });
        });
    }

    phonenumberAvailibilityValidatorAsync(control): Promise<ValidationError> {
        return new Promise(resolve => {
            this.accountService.check("phonenumber", control.value)
                .subscribe(result => {
                    if (!result.IsAvailable) {
                        resolve({ 'phonenumberTaken': true });
                    }
                    else {
                        resolve(null);
                    }
                }, error => {
                    // TODO: Same as aforementioned one
                    resolve({ 'serverConnctionError': true });
                });
        });
    }
}