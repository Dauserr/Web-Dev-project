import {Component, inject} from '@angular/core';
import {TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [TranslocoModule, NgForOf],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
  cardItems = [
    {
      src:'assets/icons/tech.svg',
      altDesc:'Технологии',
      h3Code:'technology',
      paragraphCode:'technology_description'
    },{
      src:'assets/icons/art.svg',
      altDesc:'Искусство',
      h3Code:'art',
      paragraphCode:'art_description'
    },{
      src:'assets/icons/eco.svg',
      altDesc:'Экология',
      h3Code:'ecology',
      paragraphCode:'ecology_description'
    },{
      src:'assets/icons/social.svg',
      altDesc:'Социальные проекты',
      h3Code:'social',
      paragraphCode:'social_description'
    },
  ]
}
