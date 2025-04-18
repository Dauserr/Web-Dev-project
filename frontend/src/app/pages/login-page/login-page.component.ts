import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {MatButtonModule } from '@angular/material/button';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {Router} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';
import {ApiUrlsService} from '../../services/api-urls.service';
import {ToastrService} from 'ngx-toastr';
import {AuthResponseInterface} from '../../interfaces/authResponseInterface';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    NgIf,
    MatProgressBar,
    NgStyle,
  ],
  standalone:true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent{
    private translocoService = inject(TranslocoService);
    t = (key: string) => this.translocoService.translate(key);
    currentLang = this.translocoService.getActiveLang()
    loginForm: FormGroup;
    authorizationStatus:string | 'login' | 'register';

    labelTextsLogin = [
      {labelText:'email_address',frmCtrlName:'email'},
      {labelText:'password',frmCtrlName:'password'}];

    labelTextsRegistration = [
      {labelText:'email_address',frmCtrlName:'emailRegister'},
      {labelText:'password',frmCtrlName:'passwordRegister'}
      ,{labelText:'password_repeat',frmCtrlName:"repeatPasswordRegister"}];

    isExpanded:boolean = false
    loading:boolean = false
  constructor(private fb:FormBuilder,
                private _router:Router,
              private ApiUrlsService:ApiUrlsService,
              private toastr: ToastrService) {
      this.loginForm = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        emailRegister:['',[Validators.required,Validators.email]],
        passwordRegister:['',[Validators.required,Validators.minLength(6)]],
        repeatPasswordRegister:['',[Validators.required,Validators.minLength(6)]],
      },{ validators: this.passwordsMatchValidator })
      this.authorizationStatus = 'login'
    }

    flipCard(){
      this.authorizationStatus = this.authorizationStatus === 'login' ? 'register' : 'login'
      this.isExpanded = !this.isExpanded
    }

    passwordsMatchValidator(group: AbstractControl): ValidationErrors | null{
    const password = group.get('passwordRegister')?.value;
    const repeatPassword = group.get('repeatPasswordRegister')?.value;
    return password === repeatPassword ? null : { passwordsMismatch: true };
    }

    submitForm(){
      this.loading = true;

      const body = {
        username: this.authorizationStatus === 'login'
          ? this.loginForm.get('email')?.value || ''
          : this.loginForm.get('emailRegister')?.value || '',

        password: this.authorizationStatus === 'login'
          ? this.loginForm.get('password')?.value || ''
          : this.loginForm.get('passwordRegister')?.value || '',
        auth_mode: this.authorizationStatus
      };

      // @ts-ignore
      this.ApiUrlsService.authApi['authorizationApi'](body).subscribe<AuthResponseInterface>({
        next: (res:AuthResponseInterface) => {
          switch (res.AUTH_STATUS){
            case 'SUCCESS_LOGIN':
              this.toastr.success(this.t('weAreHappyToSeeYou_success'),this.t('welcome_success'), {
                positionClass: 'toast-top-right'
              })
              localStorage.setItem('accessToken',res.access_token)
              setTimeout(() => {
                this._router.navigate(['']);
              }, 1000);
              break
            case 'SUCCESS_REGISTER':
              this.toastr.success(this.t('title_success_register'),this.t('title_success'), {
                positionClass: 'toast-top-right'
              })
              break
            default:
              this.toastr.error(this.t('title_error_desc'),this.t('title_error'), {
                positionClass: 'toast-top-right'
              })
          }
        },
        error: (err) => {
          switch (err.error.AUTH_STATUS){
            case 'USER_NOT_EXISTS':
              this.toastr.error(this.t('title_user_not_exist'),this.t('title_error'), {
                positionClass: 'toast-top-right'
              })
              break
            case 'INCORRECT_PASSWORD':
              this.toastr.error(this.t('title_entered_invalid_pass'),this.t('title_error'), {
                positionClass: 'toast-top-right'
              })
              break
            case 'ALREADY_EXISTS':
              this.toastr.error(this.t('title_user_already_exist'),this.t('title_error'), {
                positionClass: 'toast-top-right'
              })
              break
            default:
              this.toastr.error(this.t('title_error_desc'),this.t('title_error'), {
                positionClass: 'toast-top-right'
              })
          }
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
}
