import {inject} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

export const appTranslator = () => {
  const translocoService = inject(TranslocoService)
  return (key: string) => translocoService.translate(key)
}
