import { Component } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
    directives: [CollapseDirective],
    styleUrls: ['app/navbar/navbar.component.css']
})
export class NavbarComponent {
    public isCollapsed: boolean = false;

    constructor() {
    }
}