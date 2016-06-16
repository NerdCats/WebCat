import { Component, OnInit } from '@angular/core';
import { AppSettings } from  '../../shared/app.settings';
import { AccountService } from '../shared/account.service';
import { RouteParams } from '@angular/router-deprecated';

@Component({
    selector: 'confirm-email',
    templateUrl: 'app/account/confirm-email/confirm-email.component.html',
    providers: [AccountService],
    styles: ["#emailConfirmContainer { padding-top: 100px; }"]
})
export class ConfirmEmailComponent implements OnInit {
    AppName: string = AppSettings.APP_NAME;

    emailConfirmationStatus: string = "Processing..";

    isProcessing: boolean;
    isSuccessful: boolean;

    userId: string;

    constructor(private accountService: AccountService, private routeParams: RouteParams) { }

    ngOnInit() {
        this.isProcessing = true;
        let userId = this.routeParams.get('userId');
        let code = this.routeParams.get('code');
        this.userId = userId;
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

    resendEmailConfirmation() {
        this.emailConfirmationStatus = "Resending confirmation email";
        this.accountService.resendConfirmEmail(this.userId)
            .subscribe(result => {
                this.emailConfirmationStatus = "Thank you. A new account confirmation mail has been sent to your email address";
            }, error => {
                this.emailConfirmationStatus = "Oopsie! even resending confirmation email failed!";
            });
    }
}