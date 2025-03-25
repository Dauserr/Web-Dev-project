import { translocoConfig, TranslocoConfig } from '@ngneat/transloco';

export const translocoConfigOptions: TranslocoConfig = translocoConfig({
  availableLangs: ['kz', 'ru'],
  defaultLang: 'ru',
  fallbackLang: 'ru',
  reRenderOnLangChange: true,
  prodMode: false,
});
