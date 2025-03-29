import {Component, OnInit} from '@angular/core';
import {ApiUrlsService} from '../../services/api-urls.service';
import {ProfileInfo, ProfileInfoResponse} from '../../interfaces/profileInfoResponse';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    MatProgressSpinnerModule,
    NgClass,
    NgIf
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
  constructor(private _urlService:ApiUrlsService) {
  }
  ngOnInit() {
    this.isLoadingPage = true
    this.headerAddRemoveStyleWhenPageLoading('add')
     this._urlService.profileApi.getUserProfileInformation().subscribe({
       next: (res:ProfileInfoResponse) => {
           if(res?.response_code === 'SUCCESS'  && res.data){
             this.userInfo = res.data
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

  editProfile() {
    console.log('Redirect to edit profile page');
  }

  logout() {
    console.log('User logged out');
  }
}
