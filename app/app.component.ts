import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AppSettings } from './shared/app.settings';
import { WrapHeaderComponent } from './wrapHeader/WrapHeader.component';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'webcat',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, WrapHeaderComponent],
  providers: [ROUTER_PROVIDERS, Title]
})
@RouteConfig([
  {
    path: '/home',
    name: 'Home',
    component: WrapHeaderComponent,
    useAsDefault: true
  }
])
export class AppComponent {
  public isCollapsed: boolean = false;

  constructor(title: Title) {
    title.setTitle(AppSettings.APP_NAME);
  }
}
