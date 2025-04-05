import {Component, inject} from '@angular/core';
import {TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

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

  constructor(private _router:Router) {}

  footerItems = [
    {
      columnHeadDefinition:'about_platform',
      columnItems:[
        {name:'about_us', link:'../about'},
        {name:'how_it_works', link:'../about'},
        {name:'rules', link:'../about'},
        {name:'security', link:'../about'}
      ]
    },{
      columnHeadDefinition:'contacts',
      columnItems:[
        {name:'email', link:'#'},
        {name:'phone', link:'#'},
        {name:'address', link:'#'}
      ]
    },{
      columnHeadDefinition:'social_networks',
      columnItems:[
        {name:'Facebook', link:'https://facebook.com'},
        {name:'Instagram', link:'https://instagram.com'},
        {name:'Twitter', link:'https://twitter.com'},
        {name:'LinkedIn', link:'https://linkedin.com'}
      ]
    },{
      columnHeadDefinition:'legal_information',
      columnItems:[
        {name:'terms_of_use', link:'../about'},
        {name:'privacy_policy', link:'../about'},
        {name:'platform_rules', link:'../about'}
      ]
    },
  ]

  navigateByUrl(url:string){
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      this._router.navigate([url]);
    }
  }
}
