import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {LayoutComponent} from './layout/layout.component';
import {ProjectCreateComponent} from './pages/project-create/project-create.component';
import {ProjectComponent} from './pages/project/project.component';
import {ProjectCatalogComponent} from './pages/project-catalog/project-catalog.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {HelpComponent} from './pages/help/help.component';
import {BlogComponent} from './pages/blog/blog.component';
import {ContactComponent} from './pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'create-project', component: ProjectCreateComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: 'catalog', component: ProjectCatalogComponent },
      { path: 'help', component: HelpComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
];
