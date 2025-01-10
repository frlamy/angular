import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[loopOf]'
})
export class LoopDirective {
  @Input('loopOf')
  array: any[] = [];

  oldArray: any[] = [];

  constructor(private template: TemplateRef<any>, private container: ViewContainerRef) {
  }

  ngDoCheck() {
    if (this.oldArray.length !== this.array.length) {

      this.container.clear();

      this.array.forEach((item: string, index: number) => {
        this.container.createEmbeddedView(this.template, {
          index,
          $implicit: item
        })
      });

      this.oldArray = [...this.array];
    }
  }
}
