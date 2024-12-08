import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[confirm]',
  standalone: false,
})
export class ConfirmDirective {

  @Input('confirm-message')
  confirmMessage = "Confirmation ?"

  @HostListener('click')
  onClickConfirm() {
    return window.confirm(this.confirmMessage);
  }

}
