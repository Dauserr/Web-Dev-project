import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {LayoutComponent} from './layout/layout.component';
import {ProjectCreateComponent} from './pages/project-create/project-create.component';
import {ProjectComponent} from './pages/project/project.component';
import {ProjectCatalogComponent} from './pages/project-catalog/project-catalog.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {HelpComponent} from './pages/help/help.component';
import {BlogComponent} from './pages/blog/blog.component';
import {ContactComponent} from './pages/contact/contact.component';
import {NoAuthGuard} from './auth/guards/noAuth.guard';
import {AuthGuard} from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    // canActivate: [NoAuthGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [NoAuthGuard],
    children: [
      {path: '',component: HomeComponent},
      {path: 'about',component: AboutComponent},
      {path: 'help',component: HelpComponent},
      {path: 'blog', component: BlogComponent },
      {path: 'contact', component: ContactComponent },
    ],

  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'create-project', component: ProjectCreateComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: 'catalog', component: ProjectCatalogComponent },
    ],

  },
];
