import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {provideTransloco, TRANSLOCO_MISSING_HANDLER} from '@ngneat/transloco';
import {translocoConfigOptions} from './core/transloco.config';
import {TranslocoHttpLoader} from './core/transloco.loader';
import {RequestHeadersInterceptor} from './interceptors/RequestHeadersInterceptor';
import {CustomMissingHandler} from './core/customMissingHandler';
import {MAT_DATE_LOCALE} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptors([RequestHeadersInterceptor])),
    provideAnimations(), provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
    }),
    provideTransloco({
      config: translocoConfigOptions,
      loader: TranslocoHttpLoader,
    }),
    {
      provide:TRANSLOCO_MISSING_HANDLER,
      useClass:CustomMissingHandler
    },
    {
      provide:LOCALE_ID,
      useValue:'ru'
    },
    {
      provide:MAT_DATE_LOCALE,
      useValue:'ru-RU'
    },
  ]
};
