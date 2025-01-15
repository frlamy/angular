import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'password-controls',
  standalone: false,

  template: `
    <div class="grid">
      <button id="generate" (click)="onInput()">{{ message }}</button>
      <button id="copy" (click)="onClickCopy()" *ngIf="password && !hasBeenCopied"  class="outline">{{ copyMessage }}</button>
      <strong id="copy-message" *ngIf="hasBeenCopied" class="outline">Le mot de passe a été copié</strong>
    </div>
  `,
  styles: ``
})
export class PasswordControlsComponent {
  @Input('button-text')
  message: string = '';

  @Input('copy-button-text')
  copyMessage: string = '';

  @Input()
  password: string = '';

  hasBeenCopied: boolean = false;

  @Output('generate')
  onClickEvent = new EventEmitter();

  onInput() {
    this.onClickEvent.emit();
  }

  onClickCopy() {
    if (!this.password) {
      return;
    }
    this.hasBeenCopied = true;
    navigator.clipboard.writeText(this.password).then();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['password']) {
      return;
    }
    this.hasBeenCopied = false;
  }
}
