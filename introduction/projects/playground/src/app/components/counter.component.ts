import {Component, Input} from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <h3> Counter : {{ initialValue }}</h3>
    <div>
      <button (click)="addStep()">+ {{ step }}</button>
      <button (click)="removeStep()">- {{ step }}</button>
      <button (click)="resetValue()">Reset</button>
    </div>
  `,
  standalone: false,
})
export class CounterComponent {
  @Input('initial-value')
  initialValue: number = 0;

  @Input('step')
  step: number = 1;

  addStep() {
    this.initialValue += this.step;
  }

  removeStep() {
    if (this.initialValue > 0) {
      this.initialValue-= this.step;
    }
  }

  resetValue() {
    this.initialValue = 0;
  }
}
