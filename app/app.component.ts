import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AppSettings } from './shared/app.settings';
import { WrapHeaderComponent } from './wrapHeader/WrapHeader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmEmailComponent } from './account/confirm-email/confirm-email.component';
import { LoginService } from './account/login/login.service'
import { Routes } from './shared/router.config';
import { SecureRouterOutlet } from './shared/secure-router-outlet.directive';

@Component({
  selector: 'webcat',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, WrapHeaderComponent, SecureRouterOutlet],
  providers: [ROUTER_PROVIDERS, Title, LoginService]
})

@RouteConfig(Routes)
export class AppComponent {
  public isCollapsed: boolean = false;

  constructor(title: Title, loginService: LoginService) {
    title.setTitle(AppSettings.APP_NAME);
  }
}
