import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilterByCategoryPipe } from './filter-by-category.pipe';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  lastUpdated: Date;
  isHelpful?: boolean;
  translationKey: string;
}

export type {FAQItem as glFAQItem}

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
    FilterByCategoryPipe,
    TranslocoModule
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  private translocoService = inject(TranslocoService);
  private router = inject(Router);
  t = (key: string) => this.translocoService.translate(key);

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
      answer: 'Для создания нового проекта нажмите кнопку "Создать проект" в верхнем меню и следуйте пошаговой инструкции. Вам нужно будет заполнить основную информацию о проекте, описать его цели и преимущества, а также установить необходимые параметры финансирования.',
      lastUpdated: new Date(),
      translationKey: 'create_project'
    },
    {
      category: 'Создание проектов',
      question: 'Какие документы нужны для создания проекта?',
      answer: 'Для создания проекта вам потребуется: паспорт или удостоверение личности, документы, подтверждающие право на интеллектуальную собственность (если есть), а также документы, подтверждающие юридический статус (для юридических лиц).',
      lastUpdated: new Date(),
      translationKey: 'documents'
    },
    {
      category: 'Поддержка и инвестиции',
      question: 'Как работает система инвестирования?',
      answer: 'Система инвестирования работает следующим образом: инвесторы могут просматривать проекты, выбирать интересующие их и инвестировать средства. Минимальная сумма инвестиций устанавливается создателем проекта. Все транзакции проводятся через безопасную платежную систему.',
      lastUpdated: new Date(),
      translationKey: 'investment'
    },
    {
      category: 'Платежи и безопасность',
      question: 'Как обеспечивается безопасность платежей?',
      answer: 'Мы используем современные системы шифрования и работаем только с проверенными платежными системами. Все транзакции защищены и проводятся через безопасные каналы связи. Дополнительно мы предлагаем страхование транзакций для большей безопасности.',
      lastUpdated: new Date(),
      translationKey: 'security'
    },
    {
      category: 'Профиль и настройки',
      question: 'Как изменить данные профиля?',
      answer: 'Для изменения данных профиля перейдите в раздел "Настройки профиля" в личном кабинете. Там вы сможете обновить личную информацию, контактные данные и настройки уведомлений.',
      lastUpdated: new Date(),
      translationKey: 'profile'
    },
    {
      category: 'Технические вопросы',
      question: 'Что делать, если сайт не загружается?',
      answer: 'Если сайт не загружается, попробуйте очистить кэш браузера, проверить подключение к интернету или использовать другой браузер. Если проблема сохраняется, обратитесь в службу поддержки.',
      lastUpdated: new Date(),
      translationKey: 'technical'
    }
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

  getQuestionTranslationKey(item: FAQItem): string {
    return `faq_${item.translationKey}_question`;
  }

  getAnswerTranslationKey(item: FAQItem): string {
    return `faq_${item.translationKey}_answer`;
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}
