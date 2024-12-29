import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'a[confirm]',
  standalone: false,
})
export class ConfirmDirective {
  @Input('confirm-message')
  confirmMessage = 'Redirection vers un autre site';

  @HostListener('click')
  onClick() {
    return window.confirm(this.confirmMessage);
  }
}
