import {Component, inject, Inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslocoService} from '@ngneat/transloco';
import {HttpClient} from '@angular/common/http';
import {ApiUrlsService} from '../../../services/api-urls.service';
import {ToastrService} from 'ngx-toastr';
import {SettedUserInfoResponse} from '../../../interfaces/settedUserInfoResponse';

@Component({
  selector: 'app-profile-edit-dialog',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatProgressBar,
    MatProgressSpinner,
    NgStyle,
    NgClass,
  ],
  templateUrl: './profile-edit-dialog.component.html',
  styleUrl: './profile-edit-dialog.component.css',
  standalone:true
})
export class ProfileEditDialogComponent implements OnInit{
  profileForm: FormGroup;
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
  profileItems = [
    {
      labelStr:'Ваше имя',
      formControlName:'user_fullName',
      inputType:'text'
    },
    {
      labelStr:'Ваша электронная почта',
      formControlName:'user_name',
      inputType:'email'
    },
    {
      labelStr:'Ваш номер телефона',
      formControlName:'user_phoneNumber',
      inputType:'number'
    },
    {
      labelStr:'Опишите себя',
      formControlName:'user_description',
      inputType:'text'
    },
  ]
  isLoadingPage = false
  constructor(private fb:FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: {
                user_fullName: string,
                user_name: string,
                user_phoneNumber: string,
                user_description: string
              },
              private ApiUrlsService:ApiUrlsService,
              private toastr: ToastrService,
              private dialogRef: MatDialogRef<ProfileEditDialogComponent>) {
    this.profileForm = this.fb.group({
      user_fullName:['',[Validators.required,Validators.minLength(6)]],
      user_name:['',[Validators.required,Validators.email]],
      user_phoneNumber:['',[Validators.required,Validators.minLength(11)]],
      user_description:['']
    })
  }

  ngOnInit() {
    Object.keys(this.data).forEach(item => {
      this.profileForm.patchValue({[item as keyof typeof this.data]:this.data?.[item as keyof typeof this.data] })
    })
      this.profileForm.get('user_name')?.disable();
  }

  onSave(){
    this.isLoadingPage = true
    const body = {
      user_fullName:this.profileForm.get('user_fullName')?.value,
      user_name:this.profileForm.get('user_name')?.value,
      user_phoneNumber:this.profileForm.get('user_phoneNumber')?.value,
      user_description:this.profileForm.get('user_description')?.value,
    }
    this.ApiUrlsService.profileApi.setUserData(JSON.stringify(body)).subscribe({
      next:(res:SettedUserInfoResponse) => {
        if(res.code === 'SUCCESS'){
          this.toastr.success('Ваши данные успешно обновились','Успех!', {
            positionClass: 'toast-top-right'
          })
        }
        this.isLoadingPage = false
        this.dialogRef.close()
      },
      error:(error) => {
        this.toastr.error(`Неизвестная ошибка,попробуйте позже \n ${error}`,'Ошибка!', {
          positionClass: 'toast-top-right'
        })
        this.isLoadingPage = false
      },
      complete: () => {
        this.isLoadingPage = false
        this.dialogRef.close()
      }
    })
  }

}
