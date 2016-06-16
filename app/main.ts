import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { LOCAL_STORAGE_PROVIDERS } from './shared/local-storage';

// INFO: Need to use a proper logging module here
bootstrap(AppComponent, [LOCAL_STORAGE_PROVIDERS])
    .catch(err => console.log("Bootstrapping Failed " + err));
