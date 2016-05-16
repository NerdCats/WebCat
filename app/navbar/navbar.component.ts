import { Component, ViewChild } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppSettings } from '../shared/app.settings';
import { SignupComponent } from '../account/signup/signup.component';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
    directives: [CollapseDirective, SignupComponent],
    styleUrls: ['app/navbar/navbar.component.css']
})
export class NavbarComponent {
    public isCollapsed: boolean = false;
    @ViewChild('signup')
    public signUpComponent: SignupComponent;

    AppTitle: string;

    constructor() {
        this.AppTitle = AppSettings.APP_NAME;
    }

    showSignUpComponent() {
        this.signUpComponent.open();
    }
}