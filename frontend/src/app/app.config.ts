import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {provideTransloco} from '@ngneat/transloco';
import {translocoConfigOptions} from './core/transloco.config';
import {TranslocoHttpLoader} from './core/transloco.loader';
import {RequestHeadersInterceptor} from './interceptors/RequestHeadersInterceptor';

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

  ]
};
