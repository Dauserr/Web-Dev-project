import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ApiUrlsService} from '../../services/api-urls.service';
import {ProfileInfo, ProfileInfoResponse} from '../../interfaces/profileInfoResponse';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CountryISO, NgxIntlTelInputModule, SearchCountryField} from 'ngx-intl-tel-input';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ProfileEditDialogComponent} from './profile-edit-dialog/profile-edit-dialog.component';
import {projectsDataTypes, UserProjectsResponse} from '../../interfaces/userProjectsResponse';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {v4 as uuidv4} from 'uuid';
import {TranslocoService} from '@ngneat/transloco';
@Component({
  selector: 'app-profile',
  imports: [
    MatProgressSpinnerModule,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    NgForOf,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css',

})
export class ProfileComponent implements OnInit{
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
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
  visibleProjectCardCount = 2
  isProjectCardsExpanded = false
  projectsData:Array<projectsDataTypes> = []
  userProjectsStatus:string = ''
  projectCardsActionButtons = [
    {
      btn_code:'just_edit',
      onBtnClick:($event:any) => {
        this.navigateByRoute('project',$event.currentTarget.parentElement.parentElement.id)
      }
    },
    {
      btn_code:'update',
      onBtnClick:($event:any) => {
        this.navigateByRoute('project',$event.currentTarget.parentElement.parentElement.id)
      }
    },
    {
      btn_code:'statistics',
      onBtnClick:() => {}
    }
  ]


  constructor(private _urlService:ApiUrlsService,
              private fb:FormBuilder,
              private _dialog:MatDialog,
              private _router:Router) {
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
    this.getUserProjects()
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

  getUserProjects(){
    this._urlService.profileApi.getUserProjects().subscribe({
      next:(res:UserProjectsResponse) => {
        if(res.response_code === 'SUCCESS'){
            this.projectsData = res.data
        }
      },
      error:(error) => {
        this.userProjectsStatus = error.error.response_code
        console.error('Ошибка:',error)
      },
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

  visibleProjectCardCountModif(){
    if(this.isProjectCardsExpanded){
      this.visibleProjectCardCount = 2
      this.isProjectCardsExpanded = false
    }else{
      this.visibleProjectCardCount = this.projectsData.length
      this.isProjectCardsExpanded = true
    }
  }

  navigateByRoute(route:string,id?:string){
    if(route === 'project'){
     return this._router.navigate([route,id])
    }
    return this._router.navigate([route])
  }

  getUuidValue(id:string){
    const additionalString = `_project_${id}`
    return  uuidv4().slice(0,12) + additionalString;
  }

  protected readonly CountryISO = CountryISO;
  protected readonly SearchCountryField = SearchCountryField;
  protected readonly String = String;
}
