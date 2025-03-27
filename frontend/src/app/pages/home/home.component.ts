import {Component, inject} from '@angular/core';
import {TranslocoModule, TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  imports: [TranslocoModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
  languageSwitcher($event:any){
    const currentLang = this.translocoService.getActiveLang();
    this.translocoService.setActiveLang(currentLang === 'ru' ? 'kz' : 'ru');
    }
}
