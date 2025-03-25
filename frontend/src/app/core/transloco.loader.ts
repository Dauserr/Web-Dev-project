import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslocoLoader } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private _httpClient: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    console.log(`📥 Вызван getTranslation() для: ${lang}`);
    return this._httpClient.get(`/i18n/${lang}.json`);
  }
}
