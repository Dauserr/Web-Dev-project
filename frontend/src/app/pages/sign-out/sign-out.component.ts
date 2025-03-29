import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-sign-out',
  imports: [
    MatCard,
    MatCardImage,
    MatCardHeader,
    MatCardContent,
    MatButtonModule
  ],
  standalone:true,
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css'
})
export class SignOutComponent implements OnInit{
  private translocoService = inject(TranslocoService);
  currentLang = this.translocoService.getActiveLang();
  t = (key: string) => this.translocoService.translate(key);

  seconds = 5
  constructor(private _router:Router){}
  ngOnInit() {
    this.bodySetOpacityBg('add')
    this.secondTaker()
  }

  secondTaker() {
    const interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds -= 1;
      } else {
        clearInterval(interval);
        this.navigateToLogin( )
      }
    }, 1000);
  }

  navigateToLogin(){
    this._router.navigate(['login'])
  }

  bodySetOpacityBg(mode:string){
    if (mode === 'add') document.body.classList.add('bg-whiteOpacity')
    else document.body.classList.remove('bg-whiteOpacity')
  }

}
