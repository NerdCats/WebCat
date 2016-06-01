import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Validators, Control } from '@angular/common';

import { ValidationError } from './validationError';
import { AccountService } from './account.service';
import { AvailibilityResponse } from './availibility-response';

@Injectable()
export class ValidationService {

    constructor(private accountService: AccountService) {

    }

    static getValidatorErrorMessage(code: string) {
        let config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address',
            'emailTaken': 'Email already taken',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long',
            'usernameTaken': 'Username already taken',
            'phonenumberTaken': 'PhoneNumber already taken',
            'serverConnctionError': 'Failed connecting to server, please try again later'
        };
        return config[code];
    }

    //section password
    passwordValidator(control): ValidationError {
        if (control.value != null && control.value.length < 6) {
            return { 'invalidPassword': true };
        }
        return null;
    }

    // section email
    get emailFormat() {
        return "^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$";
    }

    emailFormatValidator(control): ValidationError {
        var regex = new RegExp(this.emailFormat);
        if (regex.test(control.value)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    }

    emailAvailibilityValidatorAsync(control: Control): Observable<ValidationError> {
        return new Observable<ValidationError>((obs: any) => {
            control
                .valueChanges
                .debounceTime(300)
                .distinctUntilChanged()
                .take(1)
                .switchMap((value: AvailibilityResponse) => this.accountService.check("email", control.value))
                .subscribe(data => {
                    if (data.IsAvailable) {
                        obs.next({ 'emailTaken': true });
                    }
                    else {
                        obs.next(null);
                    }
                    obs.complete();
                },
                error => {
                    let message = error;
                    obs.next({ 'serverConnctionError': true });
                    obs.complete();
                })
        });
    }

    //section username
    usernameValidatorAsync(control: Control): Promise<ValidationError> {
        return new Promise(resolve => {
            this.accountService.check("username", control.value)
                .debounceTime(300)
                .distinctUntilChanged()
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

    //section phonenumber
    phonenumberAvailibilityValidatorAsync(control: Control): Promise<ValidationError> {
        return new Promise(resolve => {
            this.accountService.check("phonenumber", control.value)
                .debounceTime(300)
                .distinctUntilChanged()
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