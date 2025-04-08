import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiUrlsService } from '../../services/api-urls.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  imports: [CommonModule]
})
export class ProjectComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
  project: any;

  constructor(
    private route: ActivatedRoute, // для получения параметра ID из URL
    private apiUrlsService: ApiUrlsService // сервис для работы с API
  ) {}
  ngOnInit(): void {
    // Получаем ID из URL
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProjectDetail(projectId);
    }
  }

  loadProjectDetail(projectId: string): void {
    this.apiUrlsService.getProjectDetail(projectId).subscribe(
      (data) => {
        this.project = data;
      },
      (error) => {
        console.error('Ошибка при загрузке данных проекта', error);
      }
    );
  }
}
