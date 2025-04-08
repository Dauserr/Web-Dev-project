import {Component, inject} from '@angular/core';
import {ApiUrlsService} from '../../services/api-urls.service';
import { CommonModule } from '@angular/common';
import {HttpClientModule, HttpParams} from '@angular/common/http';
import {TranslocoService} from '@ngneat/transloco';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-catalog',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MatSelectModule, MatProgressSpinnerModule, RouterModule],
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
  isLoadingProjects = false
  constructor(private ApiUrlsService: ApiUrlsService,
              private fb : FormBuilder,
              private _activatedRoute:ActivatedRoute,
              private router:Router) {
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
    this.isLoadingProjects = true
    this.ApiUrlsService.getProjects().subscribe(
      (data) => {
        this.projects = data.projects;
        this.isLoadingProjects = false
      },
      (error) => {
        this.isLoadingProjects = false
        console.error('Ошибка при загрузке проектов', error);
      },
      () => {
        this.isLoadingProjects = false
      }
    );
  }

  writeToQueryParams(){
    const queryParamObject:any = {}
    Object.keys(this.filterForm.value).forEach(item => {
      const value = this.filterForm.get(item)?.value;
      if (value && (Array.isArray(value) ? value.length > 0 : value.trim() !== '')) {
        queryParamObject[item] = value;
      }
    });
    this.router.navigate([],{
      relativeTo:this._activatedRoute,
      queryParams:queryParamObject,
      queryParamsHandling:'replace',
      replaceUrl:true
    })

    return queryParamObject
  }

  onSearchProjects(){
    this.isLoadingProjects = true
    const queryObject = this.writeToQueryParams()
    let params = new HttpParams()
    for(const key in queryObject){
      if(queryObject[key]){
        params = params.set(key,queryObject[key])
      }
    }
    this.ApiUrlsService.catalogApi.getCatalogData(params).subscribe({
      next: (res:any) => {
        if(res.code === 'SUCCESS_FOUND'){
          this.projects = res.data
        }
        this.isLoadingProjects = false
      },
      error:(err:any) => {
        if(err.error.code === 'PROJECT_NOT_FOUND'){
          this.projects = []
        }
        this.isLoadingProjects = false
        console.error(err)
      },
      complete:() => {
        this.isLoadingProjects = false
      }
    })
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
