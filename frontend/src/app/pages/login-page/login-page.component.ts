import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule } from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatFormField} from '@angular/material/input';
import {Router} from '@angular/router';

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
    MatFormField,
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
    constructor(private fb:FormBuilder,
                private _router:Router) {
      this.loginForm = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        emailRegister:['',[Validators.required,Validators.email]],
        passwordRegister:['',[Validators.required,Validators.minLength(6)]],
        repeatPasswordRegister:['',[Validators.required,Validators.minLength(6)]],
      })
      this.authorizationStatus = 'login'
    }

    flipCard(){
      this.isExpanded = !this.isExpanded
    }

    submitForm(){
      console.log('formValue:',this.loginForm.value);
    }
}
