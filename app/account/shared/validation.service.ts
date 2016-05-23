import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ValidationError } from './validationError';
import { AccountService } from './account.service';

@Injectable()
export class ValidationService {

    constructor(private accountService: AccountService) {

    }

    emailValidator(control): ValidationError {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    usernameValidatorAsync(control): Promise<ValidationError> {
        return new Promise(resolve => {
            this.accountService.check("username", control.value)
                .subscribe(
                result => {
                    if (!result.IsAvailable) {
                        resolve({ usernameTaken: true });
                    }
                    else {
                        resolve(null);
                    }
                },
                error => { resolve({ usernameTaken: false }) }
                );
        });
    }
}