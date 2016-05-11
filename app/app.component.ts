import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from './shared/app.config';

@Component({
  selector: 'webcat',
  template: '<h1>Welcome to webcat</h1>',
  providers: [Title]
})
export class AppComponent {
  constructor(title: Title) {
    title.setTitle(AppSettings.APP_NAME);
  }
}
