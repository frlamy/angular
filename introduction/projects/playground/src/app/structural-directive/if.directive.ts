import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[if]',
})
export class IfDirective {
  @Input('if')
  condition: boolean = false;

  @Input('ifElse')
  otherTemplateRef?: TemplateRef<any>;

  constructor(private template: TemplateRef<any>, private container: ViewContainerRef) {
  }

  ngOnChanges() {
    this.container.clear()
    if (this.condition) {
      this.container?.createEmbeddedView(this.template);
      return;
    }

    if (this.otherTemplateRef) {
      this.container?.createEmbeddedView(this.otherTemplateRef)
    }
  }
}
