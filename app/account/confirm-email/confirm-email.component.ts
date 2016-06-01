import { Component, OnInit } from '@angular/core';
import { AppSettings } from  '../../shared/app.settings';
import { AccountService } from '../shared/account.service';
import { RouteParams } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
    selector: 'confirm-email',
    templateUrl: 'app/account/confirm-email/confirm-email.component.html',
    providers: [AccountService, HTTP_PROVIDERS],
    styleUrls: ['app/account/confirm-email/confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
    AppName: string = AppSettings.APP_NAME;

    isSuccessful: boolean;

    constructor(private accountService: AccountService, private routeParams: RouteParams) { }

    ngOnInit() {
        let userId = this.routeParams.get('userId');
        let code = this.routeParams.get('code');
        this.verifyEmailConfirmation(userId, code);
    }

    verifyEmailConfirmation(userId: string, code: string) {
        this.accountService.confirmEmail(userId, code)
            .subscribe(result => {
                this.isSuccessful = true;
            },
            error => {
                this.isSuccessful = false;
            });
    }
}