import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { AppSettings } from './shared/app.settings';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { ConfirmEmailComponent } from './account/confirm-email/confirm-email.component';
import { JobTrackComponent } from './job/job-track/job-track.component';
import { LoginService } from './account/login/login.service'
import { Routes } from './shared/router.config';
import { SecureRouterOutlet } from './shared/secure-router-outlet.directive';
import { VendorService } from './vendors-list/vendor.service';

@Component({
  selector: 'webcat',
  templateUrl: 'app/app.component.html',
  directives: [
    ROUTER_DIRECTIVES,
    NavbarComponent,
    SecureRouterOutlet,
    JobTrackComponent,
    FooterComponent
  ],
  providers: [Title, LoginService, VendorService]
})
@RouteConfig(Routes)
export class AppComponent {
  public isCollapsed: boolean = false;

  constructor(title: Title, loginService: LoginService) {
    title.setTitle(AppSettings.APP_NAME);
  }
}
