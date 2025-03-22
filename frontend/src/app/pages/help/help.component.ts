import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilterByCategoryPipe } from './filter-by-category.pipe';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  lastUpdated: Date;
  isHelpful?: boolean;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FilterByCategoryPipe
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  searchQuery: string = '';
  categories: string[] = [
    'Создание проектов',
    'Поддержка и инвестиции',
    'Платежи и безопасность',
    'Профиль и настройки',
    'Технические вопросы'
  ];

  faqItems: FAQItem[] = [
    {
      category: 'Создание проектов',
      question: 'Как создать новый проект?',
      answer: 'Для создания нового проекта нажмите кнопку "Создать проект" в верхнем меню и следуйте пошаговой инструкции.',
      lastUpdated: new Date()
    },
    // Добавьте больше вопросов здесь
  ];

  filteredFAQItems: FAQItem[] = this.faqItems;

  searchFAQ(): void {
    if (!this.searchQuery.trim()) {
      this.filteredFAQItems = this.faqItems;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredFAQItems = this.faqItems.filter(item =>
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  }

  markAsHelpful(item: FAQItem, isHelpful: boolean): void {
    item.isHelpful = isHelpful;
    // Здесь можно добавить логику для сохранения отзыва
  }
}
