import {Directive, ElementRef, Input, SimpleChange, SimpleChanges} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[set-classes]'
})
export class SetClassesDirective {

  @Input('set-classes')
  cssClasses : { [key: string]: boolean} = {};

  @Input('example')
  example: string = '';

  constructor(private element: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['cssClasses']) {
      return;
    }
    const classNames = Object.keys(this.cssClasses);

    classNames.forEach(className => {
      if (this.cssClasses[className]) {
        this.element.nativeElement.classList.add(className);
        return;
      }

      this.element.nativeElement.classList.remove(className);
    });
  }
}
