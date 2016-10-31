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
        // need to move this regex out and fix them in router-config.ts
        let jobTrackPageUrlRegex = "track/Job-[A-Z|0-9]{8}";
        let vendorListPageReges = "vendors/.*";
        let vendorMenuPageReges = "vendors/.*/.*";
        let searchResultPageRegex = "search/.*/.*";
      return this.publicRoutes.indexOf(url) !== -1
            || (url.match(jobTrackPageUrlRegex) !== null && url.match(jobTrackPageUrlRegex).indexOf(url) !== -1)
            || (url.match(vendorListPageReges) !== null && url.match(vendorListPageReges).indexOf(url) !== -1)
            || (url.match(vendorMenuPageReges) !== null && url.match(vendorMenuPageReges).indexOf(url) !== -1)
            || (url.match(searchResultPageRegex) !== null && url.match(searchResultPageRegex).indexOf(url) !== -1)
            || this.loginService.isLoggedIn;
    }
}