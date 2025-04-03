import {Component, inject} from '@angular/core';
import {TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [TranslocoModule, NgForOf],
  standalone:true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);

  footerItems = [
    {
      columnHeadDefinition:'about_platform',
      columnItems:['about_us','how_it_works','rules','security']
    },{
      columnHeadDefinition:'contacts',
      columnItems:['email','phone','address']
    },{
      columnHeadDefinition:'social_networks',
      columnItems:['Facebook','Instagram','Twitter','LinkedIn']
    },{
      columnHeadDefinition:'legal_information',
      columnItems:['terms_of_use','privacy_policy','platform_rules']
    },
  ]

}
