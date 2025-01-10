import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'password-controls',
  standalone: false,

  template: `
    <button (click)="onInput()">{{ message }}</button>
  `,
  styles: ``
})
export class PasswordControlsComponent {
  @Input('button-text')
  message: string = '';

  @Output('generate')
  onClickEvent = new EventEmitter();

  onInput() {
    this.onClickEvent.emit();
  }


}
