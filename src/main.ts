import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
      provideAuth0({
        domain: 'dev-i7fu6ukztctihh2e.eu.auth0.com',
        clientId: 'CgGQ7LOZm7FucpTn97u81J3WtCtWkTc5',
        authorizationParams: {
          redirect_uri: window.location.origin
        }
      }),
  ],
});
