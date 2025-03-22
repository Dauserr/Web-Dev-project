import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

interface Project {
  title: string;
  subtitle: string;
  mainImage: string;
  videoUrl?: string;
  progress: number;
  raisedAmount: number;
  investorsCount: number;
  timeRemaining: string;
  description: string;
  goals: string[];
  rewards: Reward[];
  stretchGoals: StretchGoal[];
  author: Author;
  comments: Comment[];
  updates: Update[];
  faq: FAQ[];
  risks: Risk[];
}

interface Reward {
  title: string;
  amount: number;
  description: string;
}

interface StretchGoal {
  title: string;
  description: string;
  progress: number;
}

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface Comment {
  userName: string;
  userAvatar: string;
  text: string;
}

interface Update {
  date: Date;
  title: string;
  content: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Risk {
  title: string;
  description: string;
  solution: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  standalone: true,
  imports: [CommonModule, SafePipe]
})
export class ProjectComponent implements OnInit {
  project: Project = {
    title: 'Название проекта',
    subtitle: 'Краткий слоган проекта',
    mainImage: 'assets/images/project-main.jpg',
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
    progress: 0,
    raisedAmount: 0,
    investorsCount: 0,
    timeRemaining: '30 дней',
    description: 'Описание проекта...',
    goals: [],
    rewards: [],
    stretchGoals: [],
    author: {
      name: '',
      avatar: '',
      bio: ''
    },
    comments: [],
    updates: [],
    faq: [],
    risks: []
  };

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Здесь будет логика загрузки данных проекта
    this.loadProjectData();
  }

  private loadProjectData(): void {
    // TODO: Загрузка данных проекта из сервиса
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
