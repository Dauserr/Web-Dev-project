import { Component } from '@angular/core';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faPersonCircleQuestion, faQuestion, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chatbot',
  imports: [
    FontAwesomeModule
  ],
  standalone:true,
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  protected readonly faQuestion = faQuestion;
  protected readonly faPersonCircleQuestion = faPersonCircleQuestion;
  protected readonly faQuestionCircle = faQuestionCircle;
}
