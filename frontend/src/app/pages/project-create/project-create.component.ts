import {Component, inject, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {ApiUrlsService} from '../../services/api-urls.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-project-create',
  imports: [FormsModule, HttpClientModule, CommonModule, MatFormFieldModule, MatLabel, MatHint, MatDatepickerToggle, MatInputModule, MatDatepickerInput, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  standalone:true,
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
  @ViewChild('picker') picker!: MatDatepicker<Date>;
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
  stepsContent = [
    {
      stepTitleCode:'step_1',
      stepDescriptionCode:'step_1_description',
      stepImage:'assets/icons/project-icon.png',
    },{
      stepTitleCode:'step_2',
      stepDescriptionCode:'step_2_description',
      stepImage:'assets/icons/media-content-icon.png',
    },{
      stepTitleCode:'step_3',
      stepDescriptionCode:'step_3_description',
      stepImage:'assets/icons/goal-date-icon.png',
    },{
      stepTitleCode:'step_4',
      stepDescriptionCode:'step_4_description',
      stepImage:'assets/icons/award-icon.png',
    },{
      stepTitleCode:'step_5',
      stepDescriptionCode:'step_5_description',
      stepImage:'assets/icons/check-icon.png',
    },
  ]
  today = new Date()
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
    const st = !this.project.category || !this.project.deadline || !this.project.description || !this.project.title
    console.log('Отправляем данные:', this.project,st);
    // this.ApiUrlsService.createProject(this.project).subscribe(
    //   (response: any) => {
    //     if (response.success) {
    //       console.log('Проект успешно создан:', response);
    //       alert(response.message); // Покажет "Успех"
    //
    //       // Сброс формы
    //       this.project = {
    //         title: '',
    //         description: '',
    //         user_id: this.authService.getUserId() || 0,
    //         category: '',
    //         target_funds: 0,
    //         deadline: '',
    //       };
    //     } else {
    //       console.error('Ошибка при создании проекта:', response.message);
    //       alert(response.message); // Покажет "Ошибка: ..."
    //     }
    //   },
    //   error => {
    //     console.error('Ошибка сети или сервера:', error);
    //     alert('Ошибка сети или сервера');
    //   }
    // );
  }
}
