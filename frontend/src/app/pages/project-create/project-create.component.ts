import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {ApiUrlsService} from '../../services/api-urls.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-project-create',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  constructor(
    private authService: AuthService,
    private ApiUrlsService: ApiUrlsService
  ) {}

  categories = [
    { label: 'Технологии', value: 'technology' },
    { label: 'Экология', value: 'echology' },
    { label: 'Культура', value: 'culture' },
    { label: 'Социальные проекты', value: 'social_projects' }
  ];


  project = {
    title: '',
    description: '',
    user_id: 0,
    category: '',
    target_funds: 0,
    deadline: '',
  };


  ngOnInit() {
    this.project.user_id = this.authService.getUserId() || 0;
  }
  createProject() {
    console.log('Отправляем данные:', this.project);

    this.ApiUrlsService.createProject(this.project).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Проект успешно создан:', response);
          alert(response.message); // Покажет "Успех"

          // Сброс формы
          this.project = {
            title: '',
            description: '',
            user_id: this.authService.getUserId() || 0,
            category: '',
            target_funds: 0,
            deadline: '',
          };
        } else {
          console.error('Ошибка при создании проекта:', response.message);
          alert(response.message); // Покажет "Ошибка: ..."
        }
      },
      error => {
        console.error('Ошибка сети или сервера:', error);
        alert('Ошибка сети или сервера');
      }
    );
  }
}
