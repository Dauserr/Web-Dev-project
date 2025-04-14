import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import {filter} from 'rxjs';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgIf],
  standalone:true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent{
  isFooterNeeded = true
  footerIsNotNeededRoutes = ['create-project']
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const pathname = event.urlAfterRedirects.split('/').filter(path => path !== "")
        this.isFooterNeeded = !pathname.some(path => this.footerIsNotNeededRoutes.includes(path))
    })
  }
}
