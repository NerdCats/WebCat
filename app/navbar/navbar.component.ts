import { Component } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppSettings } from '../shared/app.config';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
    directives: [CollapseDirective],
    styleUrls: ['app/navbar/navbar.component.css']
})
export class NavbarComponent {
    public isCollapsed: boolean = false;
    AppTitle: string;

    constructor() {
        this.AppTitle = AppSettings.APP_NAME;
    }
}