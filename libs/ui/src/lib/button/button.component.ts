import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nx-app-button',
  template: `
    <button [style]="style" (click)="onClick()">
      {{ title }}
    </button>
  `,
  styles: [
    `
      button {
        padding: 0.5rem;
        margin: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() title = 'Button';
  @Input() style?: string;
  @Output() clickHandler = new EventEmitter();

  onClick() {
    this.clickHandler.emit();
  }
}
