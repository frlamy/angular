import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: false,
  exportAs: 'hl',
})
export class HighlightDirective {
  ngOnInit() {
    this.backgroundColor = this.baseColor;
  }

  @Output('colorChange')
  colorChangeEvent: EventEmitter<string> = new EventEmitter();

  @Input('background-color')
  color: string = "green";

  @Input('color')
  baseColor: string = "transparent";

  @HostBinding('style.backgroundColor')
  backgroundColor: string = "transparent";

  @HostListener('mouseenter')
  onMouseEnter() {
    this.backgroundColor = this.color;
    this.colorChangeEvent.emit(this.color);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.backgroundColor = this.baseColor;
    this.colorChangeEvent.emit(this.color);
  }
}
