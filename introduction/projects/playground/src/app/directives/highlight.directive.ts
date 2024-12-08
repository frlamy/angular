import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'p[highlight]',
  standalone: false,
})
export class HighlightDirective {
  ngOnInit() {
    this.color = this.baseColor;
  }

  @HostBinding('style.backgroundColor')
  color = 'transparent';

  @Input('background-color')
  backgroundColor = 'purple';

  @Input('base-color')
  baseColor = 'transparent';

  @HostListener('mouseenter')
  onMouseEnter(){
    this.color = this.backgroundColor;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.color = this.baseColor;
  }
}
