import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiUrlsService } from '../../services/api-urls.service';
import { TranslocoService } from '@ngneat/transloco';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  standalone:true,
  imports: [CommonModule, MatProgressSpinner]
})
export class ProjectComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
  project: any;
  isLoadingPage:boolean = false
  constructor(
    private route: ActivatedRoute, // для получения параметра ID из URL
    private apiUrlsService: ApiUrlsService // сервис для работы с API
  ) {}
  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.loadProjectDetail(projectId || '');
  }

  loadProjectDetail(projectId: string): void {
    document.body.style.overflowY = 'hidden'
    this.isLoadingPage = true
    const extractedId = projectId.split('_')[2]
    this.apiUrlsService.getProjectDetail(extractedId).subscribe({
      next:(data) => {
        this.project = data;
        this.isLoadingPage = false
      },
      error:(error) => {
        console.error('Ошибка при загрузке данных проекта', error);
        this.isLoadingPage = false
      },
      complete:() => {
        this.isLoadingPage = false
        document.body.style.overflowY = 'auto'
      }
    }
    );
  }
}
