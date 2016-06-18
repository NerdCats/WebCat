import { Component, ViewChild } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse/collapse.directive';

import { AppSettings } from '../shared/app.settings';
import { SignupComponent } from '../account/signup/signup.component';
import { LoginComponent, LoginStatus } from '../account/login/login.component';
import { LoginService } from '../account/login/login.service';

import { LocalStorage } from '../shared/local-storage';
import { Router } from '@angular/router-deprecated';

type NavbarState = "PUBLIC" | "SECURED";

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
    directives: [CollapseDirective, SignupComponent, LoginComponent],
    providers: [LocalStorage],
    styleUrls: ['app/navbar/navbar.component.css']
})
export class NavbarComponent {
    @ViewChild('signup')
    public signUpComponent: SignupComponent;

    @ViewChild('login')
    public loginComponent: LoginComponent;

    AppTitle: string;
    State: NavbarState = "PUBLIC";
    UserNameString: string;

    isCollapsed: boolean;

    constructor(
        private localStorage: LocalStorage,
        private loginService: LoginService,
        private router: Router) {
        this.AppTitle = AppSettings.APP_NAME;

        if (this.loginService.isLoggedIn) {
            this.setToSecuredState();
        }
    }

    onLoginCompleted(loginStatus: LoginStatus) {
        if (loginStatus == "SUCCESS") {
            this.setToSecuredState();
        }
    }

    // INFO: This is definitely bad design
    // need to find a proper way to take this responsibilty
    // off navbar
    logout() {
        this.loginService.logout();
        this.State = "PUBLIC";
        this.router.navigate(["Home"]);
    }

    showSignUpComponent() {
        this.signUpComponent.open();
    }

    showLoginComponent() {
        this.loginComponent.open();
    }

    private setToSecuredState() {
        this.State = "SECURED";
        let authToken = this.localStorage.getObject("auth_token");
        this.UserNameString = authToken["userName"];
    }
}