import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiUrlsService } from '../../services/api-urls.service';
import { TranslocoService } from '@ngneat/transloco';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ProfileInfoResponse} from '../../interfaces/profileInfoResponse';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ProjectdeleteComponent} from './projectdelete/projectdelete.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  standalone:true,
  imports: [CommonModule, MatProgressSpinner, MatButtonModule,MatDialogModule]
})
export class ProjectComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
  project: any;
  isLoadingPage:boolean = false
  isCurrentUserAuthorOfProject:boolean = false;
  dialog = inject(MatDialog)
  constructor(
    private route: ActivatedRoute, // для получения параметра ID из URL
    private apiUrlsService: ApiUrlsService // сервис для работы с API
  ) {}
  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.loadProjectDetail(projectId || '');
  }

  loadProjectDetail(projectId: string): void {
    window.scrollTo({top:0,behavior:'smooth'});
    this.isLoadingPage = true
    const extractedId = projectId.split('_')[2]
    this.apiUrlsService.getProjectDetail(extractedId).subscribe({
      next:(data) => {
        this.project = data;
        this.apiUrlsService.profileApi.getUserProfileInformation().subscribe( {
          next:(res:ProfileInfoResponse) => {
            if(data.user_full_name === res.data.user_fullName){
              this.isCurrentUserAuthorOfProject = true;
            }
            this.isLoadingPage = false
          }
        })
      },
      error:(error) => {
        console.error('Ошибка при загрузке данных проекта', error);
        this.isLoadingPage = false
      },
    }
    );
  }

  onDeleteProject(){
    const dialogModal = this.dialog.open(ProjectdeleteComponent,{
      minWidth:'30%',
      minHeight:'20%',
      data:{projectId:this.project.project_id},
    })
  }
}
