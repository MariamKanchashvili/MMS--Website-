import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(),withInMemoryScrolling({scrollPositionRestoration:'top'})),
    provideTranslateService({
      fallbackLang:'ka',
      lang:'ka',
      loader:provideTranslateHttpLoader({
        prefix:'/i18n/',
        suffix:'.json'
      })
    })
    
  ]
};
