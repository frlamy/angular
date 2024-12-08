import {Component, Input} from '@angular/core';

@Component({
  selector: 'counter',
  standalone: false,
  template: `
    <h2>Counter : {{ initialValue }}</h2>
    <button (click)="addStep()">+</button>
    <button (click)="removeStep()">-</button>
    <button (click)="clearValue()">Clear</button>
  `
})
export class CounterComponent {
  @Input('initial-value')
  initialValue: number = 0;

  @Input('step')
  step: number = 0;

  addStep() {
    this.initialValue += this.step;
  }

  removeStep() {
    if (this.initialValue > 0) {
      this.initialValue -= this.step;
    }
  }

  clearValue() {
    this.initialValue = 0;
  }
}
