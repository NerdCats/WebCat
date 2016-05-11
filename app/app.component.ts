import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from './shared/app.config';

@Component({
  selector: 'webcat',
  templateUrl: 'app/app.component.html',
  providers: [Title]
})
export class AppComponent {
  AppTitle : string;
  constructor(title: Title) {
    this.AppTitle = AppSettings.APP_NAME;
    title.setTitle(this.AppTitle);
  }
}
