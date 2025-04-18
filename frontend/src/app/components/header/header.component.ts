import {Component, inject, OnInit} from '@angular/core';
import {TranslocoModule, TranslocoService} from '@ngneat/transloco';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {ProfileInfoResponse} from '../../interfaces/profileInfoResponse';
import {ApiUrlsService} from '../../services/api-urls.service';

@Component({
  selector: 'app-header',
  imports: [TranslocoModule, NgForOf, MatMenu, MatButton, MatMenuItem, MatMenuTrigger, NgIf, MatIcon, MatIconButton, MatIconModule, NgClass, NgStyle],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);

  navigationChildren = [
    {
      translationCode:'about_us',
      linkToThePage:'../about',
    },{
      translationCode:'projects',
      linkToThePage:'../catalog',
    },{
      translationCode:'faq',
      linkToThePage:'../help',
    },{
      translationCode:'blog',
      linkToThePage:'../blog',
    }
  ]
  currentLanguage = this.translocoService.getActiveLang() === 'ru' ? 'РУС' : 'ҚАЗ'
  languageItems = [
    {
      langId:'lang_ru',
      langName:'РУС'
    },
    {
      langId:'lang_kz',
      langName:'ҚАЗ'
    }
  ]
  profileItems = [
    {
      profileItemId:'view_profile_button',
      profileItemName:'view_profile',
      iconName:'perm_identity',
      destinationPath:'profile'
    },
    {
      profileItemId:'log_out_button',
      profileItemName:'log_out',
      iconName:'logout',
      destinationPath: 'sign-out'
    }
  ]
  userFullName: string | undefined = ''

  constructor(private _router:Router,
              private _urlService:ApiUrlsService) {
  }

  ngOnInit() {
    this._urlService.profileApi.getUserProfileInformation().subscribe({
      next: (res:ProfileInfoResponse) => {
        if(res?.response_code === 'SUCCESS'  && res.data){
          this.userFullName = res.data.user_fullName
        }
      },
      error:(err) => {
        console.error('Ошибка при загрузке профиля:',err)
      }
    })
  }

  checkTokenExpiration(){
    const token = localStorage.getItem('accessToken');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expTime = payload.exp * 1000;
      return Date.now() <= expTime;
    } catch (error) {
      console.error("Ошибка декодирования токена:", error);
      return false;
    }
  }

  showAuthorizationModal = this.checkTokenExpiration()

  languageSwitcher($event:any){
    const currentLang = this.translocoService.getActiveLang();
    this.translocoService.setActiveLang($event.currentTarget.id.split('_')[1]);
    localStorage.setItem('currentLang',$event.currentTarget.id.split('_')[1]);
    this.currentLanguage = this.translocoService.getActiveLang() === 'ru' ? 'РУС' : 'ҚАЗ'
  }

  navigateByUrl(url:string){
    this._router.navigate([url])
  }
}
