import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { LOCAL_STORAGE_PROVIDERS } from './shared/local-storage';
import { HTTP_PROVIDERS } from '@angular/http';
import { SECURE_HTTP_PROVIDERS} from './shared/secure-http';
import 'rxjs/add/operator/catch';

// INFO: Need to use a proper logging module here
bootstrap(AppComponent, [
    LOCAL_STORAGE_PROVIDERS,
    HTTP_PROVIDERS,
    SECURE_HTTP_PROVIDERS])
    .catch(err => console.error("Bootstrapping Failed " + err));
