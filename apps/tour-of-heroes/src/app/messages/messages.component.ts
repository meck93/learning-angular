import { Component } from '@angular/core';
import { MessageService } from './service/message.service';

@Component({
  selector: 'nx-app-messages',
  template: `
    <div *ngIf="messageService.messages.length">
      <h2>Messages</h2>
      <button class="clear" (click)="messageService.clear()">
        Clear Messages
      </button>
      <div *ngFor="let message of messageService.messages">{{ message }}</div>
    </div>
  `,
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
