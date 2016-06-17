import { Component, ViewChild } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse/collapse.directive';

import { AppSettings } from '../shared/app.settings';
import { SignupComponent } from '../account/signup/signup.component';
import { LoginComponent } from '../account/login/login.component';

type NavbarState = "PUBLIC" | "SECURED";

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
    directives: [CollapseDirective, SignupComponent, LoginComponent],
    styleUrls: ['app/navbar/navbar.component.css']
})
export class NavbarComponent {
    @ViewChild('signup')
    public signUpComponent: SignupComponent;

    @ViewChild('login')
    public loginComponent: LoginComponent;

    AppTitle: string;
    State: NavbarState = "PUBLIC";

    constructor() {
        this.AppTitle = AppSettings.APP_NAME;
    }

    showSignUpComponent() {
        this.signUpComponent.open();
    }

    showLoginComponent() {
        this.loginComponent.open();
    }
}