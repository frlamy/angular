import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  standalone: false,
  selector: 'newsletter',
  template: `
    <h3> {{ title }} </h3>
    <input #email type="email" placeholder="{{ placeholder }}">
    <ng-content select="p"></ng-content>
    <button (click)="onConfirm(email.value)">{{ buttonText }}</button>
  `,
  styleUrl: '../css/newsletter.component.css'
})
export class NewsletterComponent {
  @Input()
  title:string = "Sign in to newsletter";

  @Input('button-text')
  buttonText: string = "Please confirm";

  @Input()
  placeholder: string = "Type your email";

  @Output('confirm')
  onConfirmEvent: EventEmitter<string> = new EventEmitter<string>();

  onConfirm(email: string) {
    this.onConfirmEvent.emit(email);
  }
}
