import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {TranslocoService} from '@ngneat/transloco';

bootstrapApplication(AppComponent, appConfig).then(appRef => {
  const transloco = appRef.injector.get(TranslocoService);
  console.log('✅ TranslocoService инициализирован');
  console.log('🌍 Текущий язык:', transloco.getActiveLang());
}).catch((err) => console.error(err));
