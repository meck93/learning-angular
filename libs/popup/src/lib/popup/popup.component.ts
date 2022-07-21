import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'nx-app-popup',
  template: `
    <span>{{ message }}</span>
    <button (click)="hidePopup()">&#x2716;</button>
  `,
  styleUrls: ['./popup.component.css'],
  animations: [
    trigger('state', [
      state('opened', style({ transform: 'translateY(0%)' })),
      state(
        'void, closed',
        style({ transform: 'translateY(100%)', opacity: 0 })
      ),
      transition('* => *', animate('100ms ease-in')),
    ]),
  ],
})
export class PopupComponent {
  @HostBinding('@state')
  state: 'opened' | 'closed' = 'closed';

  @Input()
  get message(): string {
    return this._message;
  }
  set message(message: string) {
    this._message = message;
    this.state = 'opened';
  }
  private _message = '';

  @Output()
  closed = new EventEmitter();

  hidePopup() {
    this.closed.next();
  }
}
