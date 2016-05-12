import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AppSettings } from './shared/app.config';
import { WrapHeaderComponent } from './wrapHeader/WrapHeader.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'webcat',
  templateUrl: 'app/app.component.html',
  directives: [NavbarComponent, WrapHeaderComponent],
  providers: [Title]
})
export class AppComponent {
  public isCollapsed: boolean = false;
  AppTitle: string;

  constructor(title: Title) {
    this.AppTitle = AppSettings.APP_NAME;
    title.setTitle(this.AppTitle);
  }
}
