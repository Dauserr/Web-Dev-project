import {Component, inject} from '@angular/core';
import {ApiUrlsService} from '../../services/api-urls.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {TranslocoService} from '@ngneat/transloco';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-project-catalog',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MatSelectModule],
  standalone:true,
  templateUrl: './project-catalog.component.html',
  styleUrls: ['./project-catalog.component.css']
})
export class ProjectCatalogComponent {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);
  projects: any[] = [];
  filterForm: FormGroup;
  categoriesList = [
    {
      code:'technology'
    },
    {
      code:'culture'
    },
    {
      code:'echology'
    },
    {
      code:'social_projects'
    },
  ]
  sortOptions = [
    {
      code:'by_addition_date'
    },
    {
      code:'by_popularity'
    },
    {
      code:'by_raised_funds'
    },
    {
      code:'by_time_to_finish'
    },
  ]
  projectStatuses = [
    {
      code:'status_active'
    },{
      code:'status_finished'
    },
  ]

  constructor(private ApiUrlsService: ApiUrlsService,
              private fb : FormBuilder) {
      this.filterForm = this.fb.group({
        enteredProjectName:[''],
        category:[[]],
        project_status:[''],
        projects_sort:[''],
      })
  }

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

  onFilterChange($event:any,filterField:string){
    if(filterField === 'category'){
      const checkBox = $event.target as HTMLInputElement;
      const value = checkBox.value;
      const categoryControl = this.filterForm.get('category')
      const currentValues = categoryControl?.value || []
      if(checkBox.checked){
        categoryControl?.setValue([...currentValues,value])
      }else{
        categoryControl?.setValue(currentValues.filter((v:string) => v !== value))
      }
      categoryControl?.updateValueAndValidity()
    }else if(filterField === 'status'){
      const currentValue = this.filterForm.get('project_status')?.value
      this.filterForm.get('project_status')?.setValue(currentValue === $event.target.value ? '' : $event.target.value)
    }

    console.log('filterForm:',this.filterForm.value)
  }

}
