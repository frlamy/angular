import {Component, Input} from '@angular/core';

@Component({
  selector: 'password-display',
  standalone: false,

  template: `
    <div>
      <h3>{{ title }}</h3>
      <article>
        <span *ngIf="password">{{ password }}</span>
        <span *ngIf="!password">Cliquez sur le bouton "Générer"</span>
      </article>
    </div>
  `,
  styles: ``
})
export class PasswordDisplayComponent {
  @Input()
  title: string = "Votre mot de passe :";

  @Input()
  password: string = '';
}
