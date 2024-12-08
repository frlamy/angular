import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[no-open]',
  standalone: false,
})
export class NoOpenDirective {
  @HostListener('click')
  onClick() {
    return false;
  }
}
