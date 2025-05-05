import { Component } from '@angular/core';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  faMessage,
  faPaperPlane,
  faPersonCircleQuestion,
  faQuestion,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import {MatCard} from '@angular/material/card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

interface Message{
  title:string,
  sendTime:string
}

@Component({
  selector: 'app-chatbot',
  imports: [
    FontAwesomeModule,
    MatCard,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  standalone:true,
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  showChatbot = false;
  chatQuestionsForm!:FormGroup
  hasMessages:boolean = false
  messages : Message[] = []
  constructor(private fb:FormBuilder) {
    this.chatQuestionsForm = this.fb.group({
      message:['',[Validators.required]]
    })
  }

  sendMessage(){
    const currentDate = new Date()
    const objToStore = {
      title:this.chatQuestionsForm.value.message,
      sendTime:currentDate.toLocaleTimeString([],{
        hour:'2-digit',
        minute:'2-digit',
        hour12:false,
      })
    }
    this.messages.push(objToStore)
    this.hasMessages = true
    this.chatQuestionsForm.patchValue({message:''})
  }


  protected readonly faQuestion = faQuestion;
  protected readonly faPersonCircleQuestion = faPersonCircleQuestion;
  protected readonly faQuestionCircle = faQuestionCircle;
  protected readonly faMessage = faMessage;
  protected readonly faPaperPlane = faPaperPlane;
}
