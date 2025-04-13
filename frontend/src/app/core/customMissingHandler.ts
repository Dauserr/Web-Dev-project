import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomMissingHandler  {
  handle(key: string): string {
    return key;
  }
}
