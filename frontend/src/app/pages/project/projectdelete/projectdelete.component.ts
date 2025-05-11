import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {appTranslator} from '../../../../../public/i18n/translocoExports';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDivider} from '@angular/material/divider';
import {ApiUrlsService} from '../../../services/api-urls.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../components/notification/notification';

@Component({
  selector: 'app-projectdelete',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgIf,
    NgStyle,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './projectdelete.component.html',
  standalone:true,
  styleUrl: './projectdelete.component.css'
})
export class ProjectdeleteComponent{
  t = appTranslator()
  isResetDeleteButtonShown = false
  resetDeleteSeconds = 5
  isLoadingPage = false
  isDeletionReseted = false
  intervalId:any
  constructor(private _ApiUrlsService:ApiUrlsService,
              private route: ActivatedRoute,
              private _router:Router,
              private notification : NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: {projectId:number},
              private dialogRef: MatDialogRef<ProjectdeleteComponent>) {
  }


  onResetDeletion(){
    this.isResetDeleteButtonShown = false;
    this.isDeletionReseted = true;
    clearInterval(this.intervalId);
    this.resetDeleteSeconds = 5;
  }

  projectDelete(){
    this.isResetDeleteButtonShown = false;
    this.isDeletionReseted = false;
    this.resetDeleteSeconds = 5;
    clearInterval(this.intervalId); // На всякий случай

    this.isResetDeleteButtonShown = true;
    this.intervalId  = setInterval(() => {
      this.resetDeleteSeconds -= 1
      if (this.isDeletionReseted) {
        clearInterval(this.intervalId);
        this.resetDeleteSeconds = 5;
        this.isDeletionReseted = false;
        return;
      }
      if(this.resetDeleteSeconds <= 0){
        clearInterval(this.intervalId);
        this.isLoadingPage = true
        this._ApiUrlsService.catalogApi.deleteProjectById(this.data.projectId).subscribe({
          next:(data) => {
            if(data.code === 'SUCCESS_DELETE'){
              this.notification.success({
                successDescription:'success_project_deletion'
              })
            }
            this.isLoadingPage = false
            this.dialogRef.close(true);
            this._router.navigate(['profile'])
          },
          error:(error) => {
            console.error('error in deleting:',error)
            this.notification.errorNotif({
              errorDescription:"project_deletion_error",
            })
            this.isLoadingPage = false
            this.dialogRef.close(true);
            this._router.navigate(['profile'])
          }
        })
      }
    },1000)
  }
}
