import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {provideTransloco, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TranslocoModule} from '@ngneat/transloco';
import {translocoConfigOptions} from './core/transloco.config';
import {TranslocoHttpLoader} from './core/transloco.loader';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),
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
