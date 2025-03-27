import {Component, inject} from '@angular/core';
import {TranslocoModule, TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-about',
  imports: [TranslocoModule],
  standalone:true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
  languageSwitcher($event:any){
    const currentLang = this.translocoService.getActiveLang();
    this.translocoService.setActiveLang(currentLang === 'ru' ? 'kz' : 'ru');
    }
}
