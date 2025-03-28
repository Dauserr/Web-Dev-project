import { Component } from '@angular/core';
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
    FormsModule
  ]
})
export class BlogComponent {
  articles = [
    {
      title: 'Как успешно запустить краудфандинговую кампанию',
      description: 'Пошаговое руководство по созданию эффективной кампании на нашей платформе',
      image: 'assets/images/blog/article1.jpg',
      tags: ['Краудфандинг', 'Советы', 'Маркетинг']
    },
    {
      title: 'История успеха: Проект "ЭкоПакет"',
      description: 'Как команда энтузиастов собрала 1 миллион рублей на экологическую инициативу',
      image: 'assets/images/blog/article2.jpg',
      tags: ['Истории успеха', 'Экология', 'Краудфандинг']
    },
    {
      title: 'Тренды краудфандинга 2024',
      description: 'Обзор самых перспективных направлений и инноваций в мире краудфандинга',
      image: 'assets/images/blog/article3.jpg',
      tags: ['Тренды', 'Инновации', 'Краудфандинг']
    }
  ];

  popularTags = [
    'Краудфандинг', 'Советы', 'Истории успеха', 'Маркетинг', 'Экология',
    'Инновации', 'Тренды', 'Социальные проекты', 'Технологии', 'Бизнес',
    'Стартапы', 'Финансы'
  ];

  popularArticles = [
    {
      title: 'Топ-10 ошибок при запуске краудфандинговой кампании',
      date: '15 марта 2024'
    },
    {
      title: 'Как правильно составить описание проекта',
      date: '10 марта 2024'
    },
    {
      title: 'Секреты успешного продвижения проекта',
      date: '5 марта 2024'
    },
    {
      title: 'Как выбрать правильное время для запуска',
      date: '1 марта 2024'
    },
    {
      title: 'Работа с инвесторами: основные правила',
      date: '25 февраля 2024'
    }
  ];

  authors = [
    {
      name: 'Анна Петрова',
      bio: 'Эксперт по краудфандингу с 5-летним опытом',
      image: 'assets/images/blog/author1.jpg'
    },
    {
      name: 'Михаил Иванов',
      bio: 'Успешный предприниматель и наставник',
      image: 'assets/images/blog/author2.jpg'
    },
    {
      name: 'Елена Смирнова',
      bio: 'Маркетолог и специалист по социальным проектам',
      image: 'assets/images/blog/author3.jpg'
    }
  ];
}
