import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  constructor(private translocoService: TranslocoService) {
    translocoService.load('ru').subscribe(() => {
      console.log('✅ Перевод ru загружен');
    }, error => {
      console.error('❌ Ошибка загрузки перевода:', error);
    });

    translocoService.load('kz').subscribe(() => {
      console.log('✅ Перевод ru загружен');
    }, error => {
      console.error('❌ Ошибка загрузки перевода:', error);
    });
  }
}
