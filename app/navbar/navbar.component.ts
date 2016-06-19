import { Component, ViewChild } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse/collapse.directive';

import { AppSettings } from '../shared/app.settings';
import { SignupComponent } from '../account/signup/signup.component';
import { LoginComponent, LoginStatus } from '../account/login/login.component';
import { LoginService } from '../account/login/login.service';

import { LocalStorage } from '../shared/local-storage';
import { Router } from '@angular/router-deprecated';

type NavbarState = "PUBLIC" | "SECURED";

interface NavbarElement {
    Title: string;
    Event(): void;
}

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

    profileNavElement: NavbarElement;
    userNameString: string;

    private _publicNavElements: Array<NavbarElement>;
    private _secureNavElements: Array<NavbarElement>;

    navBarElementDict = {};

    isCollapsed: boolean;

    constructor(
        private localStorage: LocalStorage,
        private loginService: LoginService,
        private router: Router) {
        this.AppTitle = AppSettings.APP_NAME;

        if (this.loginService.isLoggedIn) {
            this._setToSecuredState();
        }

        this._initiatePublicNavElements();
        this._initiateSecureNavElements();
    }

    onLoginCompleted(loginStatus: LoginStatus) {
        if (loginStatus == "SUCCESS") {
            this._setToSecuredState();
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

    private _initiatePublicNavElements() {
        this._publicNavElements = new Array<NavbarElement>();
        this._publicNavElements.push({
            Title: "Sign Up",
            Event: () => { this.showSignUpComponent(); }
        });
        this._publicNavElements.push({
            Title: "Log In",
            Event: () => { this.showLoginComponent(); }
        });

        this.navBarElementDict['PUBLIC'] = this._publicNavElements;
    }

    private _initiateSecureNavElements() {
        this._secureNavElements = new Array<NavbarElement>();
        this._secureNavElements.push({
            Title: "Dashboard",
            Event: () => { console.log("Not Implemented Yet"); }
        });

        this._secureNavElements.push({
            Title: this.userNameString,
            Event: () => { console.log("Not Implemented Yet"); }
        });

        this._secureNavElements.push({
            Title: "Log Out",
            Event: () => { this.logout(); }
        });

        this.navBarElementDict['SECURED'] = this._secureNavElements;
    }

    public _setToSecuredState() {
        this.State = "SECURED";
        var userName = this.localStorage.getObject("auth_token")["userName"];
        this.userNameString = userName;

        // INFO : This is literally shameless, but sometimes, you just gotta do it
        if(this._secureNavElements) {
            this._secureNavElements[1].Title = this.userNameString;
        }
    }
}