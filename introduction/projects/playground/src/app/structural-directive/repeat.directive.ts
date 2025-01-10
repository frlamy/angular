import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[repeat]'
})
export class RepeatDirective {
  @Input('repeat')
  repeat: number  = 0;

  constructor(private template: TemplateRef<any>, private container: ViewContainerRef) {}

  ngOnChanges() {
    this.container.clear();
    let index = 0;
    while (index < this.repeat) {
      index++ ;
      this.container.createEmbeddedView(this.template, {
        $implicit: index
      });
    }
  }
}
