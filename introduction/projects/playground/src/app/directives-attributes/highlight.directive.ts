import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: false
})
export class HighlightDirective {
  ngOnInit() {
    this.backgroundColor = this.baseColor;
  }

  @Input('background-color')
  color: string = "green";

  @Input('base-color')
  baseColor: string = "transparent";

  @HostBinding('style.backgroundColor')
  backgroundColor: string = "transparent";

  @HostListener('mouseenter')
  onMouseEnter() {
    this.backgroundColor = this.color;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.backgroundColor = this.baseColor;
  }
}
