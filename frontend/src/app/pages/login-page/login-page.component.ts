import { Component } from '@angular/core';
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
    loginForm: FormGroup;
    authorizationStatus:string | 'login' | 'register';

    labelTextsLogin = [
      {labelText:'Email',frmCtrlName:'email'},
      {labelText:'Password',frmCtrlName:'password'}];

    labelTextsRegistration = [
      {labelText:'Email',frmCtrlName:'emailRegister'},
      {labelText:'Password',frmCtrlName:'passwordRegister'}
      ,{labelText:'Repeat your password',frmCtrlName:"repeatPasswordRegister"}];

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
              this.toastr.success('Мы рады вас снова видеть','Добро пожаловать!', {
                positionClass: 'toast-top-right'
              })
              localStorage.setItem('accessToken',res.access_token)
              this._router.navigate(['']);
              break
            case 'SUCCESS_REGISTER':
              this.toastr.success('Аккаунт успешно создан','Успех!', {
                positionClass: 'toast-top-right'
              })
              break
            default:
              this.toastr.error('Неизвестная ошибка,просим вас войти позже','Ошибка!', {
                positionClass: 'toast-top-right'
              })
          }
        },
        error: (err) => {
          switch (err.error.AUTH_STATUS){
            case 'USER_NOT_EXISTS':
              this.toastr.error('Пользователь с таким именем не существует','Ошибка!', {
                positionClass: 'toast-top-right'
              })
              break
            case 'INCORRECT_PASSWORD':
              this.toastr.error('Вы ввели неправильный пароль','Ошибка!', {
                positionClass: 'toast-top-right'
              })
              break
            case 'ALREADY_EXISTS':
              this.toastr.error('Пользователь с таким именем уже существует','Ошибка!', {
                positionClass: 'toast-top-right'
              })
              break
            default:
              this.toastr.error('Неизвестная ошибка,просим вас войти позже','Ошибка!', {
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
