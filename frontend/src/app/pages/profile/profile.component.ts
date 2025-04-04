import {Component, OnInit} from '@angular/core';
import {ApiUrlsService} from '../../services/api-urls.service';
import {ProfileInfo, ProfileInfoResponse} from '../../interfaces/profileInfoResponse';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CountryISO, NgxIntlTelInputModule, SearchCountryField} from 'ngx-intl-tel-input';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ProfileEditDialogComponent} from './profile-edit-dialog/profile-edit-dialog.component';

@Component({
  selector: 'app-profile',
  imports: [
    MatProgressSpinnerModule,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    NgForOf,
    MatDialogModule
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userInfo?  :ProfileInfo = {
    user_name:'',
    user_fullName:'',
    user_phoneNumber:'',
    user_description:''
  }as ProfileInfo;
  isLoadingPage = false
  isUserProfileConfigured = true
  profileForm: FormGroup;
  profileItems = [
    {
      labelStr:'Ваше имя',
      formControlName:'user_fullName',
    },
    {
      labelStr:'Ваша электронная почта',
      formControlName:'user_name',
    },
    {
      labelStr:'Ваш номер телефона',
      formControlName:'user_phoneNumber',
    },
    {
      labelStr:'Опишите себя',
      formControlName:'user_description',
    },
  ]
  isFormActive = false


  constructor(private _urlService:ApiUrlsService,
              private fb:FormBuilder,
              private _dialog:MatDialog) {
      this.profileForm = this.fb.group({
        user_fullName:['',[Validators.required]],
        user_name:['',[Validators.required,Validators.email]],
        user_phoneNumber:['',[Validators.required,Validators.minLength(11)]],
        user_description:['']
      })
  }
  ngOnInit() {
    this.isLoadingPage = true
    this.headerAddRemoveStyleWhenPageLoading('add')
    this.reloadProfileData()
    if (!this.isFormActive) {
      this.profileForm.disable();
    } else {
      this.profileForm.enable();
    }
  }

  reloadProfileData(){
    this._urlService.profileApi.getUserProfileInformation().subscribe({
      next: (res:ProfileInfoResponse) => {
        if(res?.response_code === 'SUCCESS'  && res.data){
          this.userInfo = res.data
          Object.keys(res.data).forEach(item => {
            this.profileForm.patchValue({[item as keyof typeof res.data]:res?.data?.[item as keyof typeof res.data] })
          })
          if (!res.data.user_description || !res.data.user_fullName || !res.data.user_phoneNumber){
            this.isUserProfileConfigured = false
          }
        }
        this.headerAddRemoveStyleWhenPageLoading('remove')
        this.isLoadingPage = false
      },
      error:(err) => {
        console.error('Ошибка при загрузке профиля:',err)
        this.headerAddRemoveStyleWhenPageLoading('remove')
        this.isLoadingPage = false
      }
    })
  }

  headerAddRemoveStyleWhenPageLoading(mode:string){
    const header = document.querySelector('header');
    if (header) {
      if (mode === 'add') {
        header.classList.add('header-when-isPageLoading');
      }else header.classList.remove('header-when-isPageLoading')
    }
  }

  onEdit(){
    const dialogRef = this._dialog.open(ProfileEditDialogComponent,{
      minWidth:'700px',
      width:'auto',
      data:{
        user_fullName:this.profileForm.get('user_fullName')?.value,
        user_name:this.profileForm.get('user_name')?.value,
        user_phoneNumber:this.profileForm.get('user_phoneNumber')?.value,
        user_description:this.profileForm.get('user_description')?.value,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadProfileData();
      }
    });
  }

  logout() {
    console.log('User logged out');
  }

  protected readonly CountryISO = CountryISO;
  protected readonly SearchCountryField = SearchCountryField;
}
