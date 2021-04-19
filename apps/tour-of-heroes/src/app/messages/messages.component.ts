import { Component } from '@angular/core';
import { MessageService } from './service/message.service';
@Component({
  selector: 'nx-app-messages',
  template: `
    <div *ngIf="messageService.messages.length">
      <h2>Messages</h2>
      <button
        class="clear mb-2 mb-md-0 mr-md-2"
        (click)="messageService.clear()"
      >
        Clear Messages (Integrated Button)
      </button>
      <nx-app-button
        title="Clear Message (Button from UI Library)"
        style="margin-top: 0; margin-bottom: 12px; font-size: 1rem;"
        (click)="messageService.clear()"
      ></nx-app-button>
      <div *ngFor="let message of messageService.messages">{{ message }}</div>
    </div>
  `,
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
