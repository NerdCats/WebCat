import {
    ViewContainerRef,
    DynamicComponentLoader,
    Directive,
    Attribute } from '@angular/core';

import {
    Router,
    RouterOutlet,
    ComponentInstruction } from '@angular/router-deprecated';

import { Subject } from 'rxjs/Subject';

// INFO: This needs to relocate properly
import { LoginService } from '../account/login/login.service';
import { PublicRoutes } from './router.config';

@Directive({
    selector: 'secure-router-outlet'
})
export class SecureRouterOutlet extends RouterOutlet {
    publicRoutes: Array<string>;
    private parentRouter: Router;

    constructor(
        containerRef: ViewContainerRef,
        loader: DynamicComponentLoader,
        parentRouter: Router,
        @Attribute('name') nameAttr: string,
        private loginService: LoginService) {

        super(containerRef, loader, parentRouter, nameAttr);

        this.parentRouter = parentRouter;
        this.publicRoutes = PublicRoutes;
    }

    activate(instruction: ComponentInstruction) {
        if (this._canActivate(instruction.urlPath)) {
            return super.activate(instruction);
        }

        this.parentRouter.navigate(['/Home'])
    }

    private _canActivate(url: string) {
        return this.publicRoutes.indexOf(url) !== -1
            || (url.match("track/Job-[A-Z|0-9]{8}") !== null && url.match("track/Job-[A-Z|0-9]{8}").indexOf(url) !== -1)
            || this.loginService.isLoggedIn;
    }
}