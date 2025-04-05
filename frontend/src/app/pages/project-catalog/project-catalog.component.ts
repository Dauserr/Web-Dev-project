import { Component } from '@angular/core';
import {ApiUrlsService} from '../../services/api-urls.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-project-catalog',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './project-catalog.component.html',
  styleUrls: ['./project-catalog.component.css']
})
export class ProjectCatalogComponent {
  projects: any[] = [];

  constructor(private ApiUrlsService: ApiUrlsService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.ApiUrlsService.getProjects().subscribe(
      (data) => {
        this.projects = data.projects;
      },
      (error) => {
        console.error('Ошибка при загрузке проектов', error);
      }
    );
  }
}
