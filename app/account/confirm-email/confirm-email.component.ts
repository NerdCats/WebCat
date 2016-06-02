import { Component, OnInit } from '@angular/core';
import { AppSettings } from  '../../shared/app.settings';
import { AccountService } from '../shared/account.service';
import { RouteParams } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
    selector: 'confirm-email',
    templateUrl: 'app/account/confirm-email/confirm-email.component.html',
    providers: [AccountService, HTTP_PROVIDERS],
    styles: ["#emailConfirmContainer { padding-top: 200px; }"]
})
export class ConfirmEmailComponent implements OnInit {
    AppName: string = AppSettings.APP_NAME;

    emailConfirmationStatus: string = "Processing..";

    isProcessing: boolean;
    isSuccessful: boolean;

    constructor(private accountService: AccountService, private routeParams: RouteParams) { }

    ngOnInit() {
        this.isProcessing = true;
        let userId = this.routeParams.get('userId');
        let code = this.routeParams.get('code');
        this.verifyEmailConfirmation(userId, code);
    }

    verifyEmailConfirmation(userId: string, code: string) {
        this.accountService.confirmEmail(userId, code)
            .subscribe(result => {
                this.emailConfirmationStatus = "Thank you for confirming your email address";
                this.isSuccessful = true;
                this.isProcessing = false;
            },
            error => {
                this.emailConfirmationStatus = "Oops! Something went wrong.";
                this.isSuccessful = false;
                this.isProcessing = false;
            });
    }
}