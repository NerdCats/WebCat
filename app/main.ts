import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { LOCAL_STORAGE_PROVIDERS } from './shared/local-storage';
import { HTTP_PROVIDERS } from '@angular/http';

// INFO: Need to use a proper logging module here
bootstrap(AppComponent, [LOCAL_STORAGE_PROVIDERS, HTTP_PROVIDERS])
    .catch(err => console.log("Bootstrapping Failed " + err));
