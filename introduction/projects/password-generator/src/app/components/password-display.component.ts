import {Component, Input} from '@angular/core';

@Component({
  selector: 'password-display',
  standalone: false,

  template: `
    <div>
      <h3>{{ title }}</h3>
      <article>{{ message }}</article>
    </div>
  `,
  styles: ``
})
export class PasswordDisplayComponent {
  @Input()
  title: string = "Votre mot de passe :";

  @Input()
  message: string = '';
}
