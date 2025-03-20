import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {ProjectCreateComponent} from './pages/project-create/project-create.component';
import {ProjectComponent} from './pages/project/project.component';
import {ProjectCatalogComponent} from './pages/project-catalog/project-catalog.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {HelpComponent} from './pages/help/help.component';
import {BlogComponent} from './pages/blog/blog.component';

export const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'about-us',
    component:AboutComponent
  },
  {
    path:'register',
    component:RegisterPageComponent
  },
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path:'profile-account',
    component:ProfileComponent
  },
  {
    path:'project-create',
    component:ProjectCreateComponent
  },
  {
    path:'project-page',
    component:ProjectComponent
  },
  {
    path:'projects-catalog',
    component:ProjectCatalogComponent
  },
  {
    path:'help-faq',
    component:HelpComponent
  },
  {
    path:'blog-news',
    component:BlogComponent
  },
];
