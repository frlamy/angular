import {Component, Input} from '@angular/core';

@Component({
  standalone: false,
  selector: 'card',
  template: `
  <article>
    <header> {{ title }}</header>
    <ng-content></ng-content>
    <ng-content select="footer"></ng-content>
  </article>`,
  styles: []
})
export class CardComponent {
  @Input()
  title: string = "Default title";
}
