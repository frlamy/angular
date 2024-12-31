import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {Element} from '@angular/compiler';

@Directive({
  standalone: false,
  selector: '[model]'
})
export class ModelChangeDirective {
  @Output('modelChange')
  modelChangeEvent = new EventEmitter();

  @Input("model")
  @HostBinding('value')
  value: any;

  @HostListener('input', ['$event.target'])
  onInput(element: HTMLInputElement) {
    if (element.type === 'number') {
      this.value = element.valueAsNumber;
      this.modelChangeEvent.emit(this.value);
    }

    if (element.type === 'text') {
      this.value = element.value;
      this.modelChangeEvent.emit(this.value);
    }
  }
}
