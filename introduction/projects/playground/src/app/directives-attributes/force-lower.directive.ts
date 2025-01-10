import {Directive, EventEmitter, HostBinding, HostListener, Input, Output, SimpleChanges} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[force-lower]'
})
export class ForceLowerDirective {
  @HostBinding('value')
  @Input('value')
  value = '';

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.value = value.toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.value = this.value.toLowerCase();
  }
}
