import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { ApiUrlsService } from '../../services/api-urls.service';
import { OnInit } from '@angular/core';

interface Article {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    TranslocoModule
  ]
})
export class BlogComponent implements OnInit {
  private translocoService = inject(TranslocoService);
  t = (key: string) => this.translocoService.translate(key);

  constructor(private apiUrlsService: ApiUrlsService) { }

  articles: Article[] = [];

  ngOnInit(): void {
    this.apiUrlsService.getNews().subscribe({
      next: (data) => {
        this.articles = data;
        console.log('articles', this.articles);
      },
      error: (error) => {
        console.error('Ошибка при загрузке статей:', error);
        // Здесь можно добавить обработку ошибки, например, показать уведомление пользователю
      }
    });
  }

  popularTags = [
    'blog_crowdfunding_tag',
    'blog_tips_tag',
    'blog_success_tag',
    'blog_marketing_tag',
    'blog_ecology_tag',
    'blog_innovation_tag',
    'blog_trends_tag',
    'blog_social_tag',
    'blog_technology_tag',
    'blog_business_tag',
    'blog_startup_tag',
    'blog_finance_tag'
  ];

  popularArticles = [
    {
      titleKey: 'blog_popular_article1_title',
      dateKey: 'blog_popular_article1_date'
    },
    {
      titleKey: 'blog_popular_article2_title',
      dateKey: 'blog_popular_article2_date'
    },
    {
      titleKey: 'blog_popular_article3_title',
      dateKey: 'blog_popular_article3_date'
    },
    {
      titleKey: 'blog_popular_article4_title',
      dateKey: 'blog_popular_article4_date'
    },
    {
      titleKey: 'blog_popular_article5_title',
      dateKey: 'blog_popular_article5_date'
    }
  ];

  authors = [
    {
      nameKey: 'blog_author1_name',
      bioKey: 'blog_author1_bio',
      image: 'assets/images/blog/author1.jpg'
    },
    {
      nameKey: 'blog_author2_name',
      bioKey: 'blog_author2_bio',
      image: 'assets/images/blog/author2.jpg'
    },
    {
      nameKey: 'blog_author3_name',
      bioKey: 'blog_author3_bio',
      image: 'assets/images/blog/author3.jpg'
    },
    {
      nameKey: 'blog_author4_name',
      bioKey: 'blog_author4_bio',
      image: 'assets/images/blog/author4.jpg'
    }
  ];

  searchQuery: string = '';
  selectedTabIndex = 0;

  searchArticles(): void {
    // Здесь будет логика поиска статей
  }
}
