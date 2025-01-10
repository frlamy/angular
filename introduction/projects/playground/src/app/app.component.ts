import {Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {last} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  basicIncome = 100;

  defaultColor = 'yellow';

  age: number = 30;

  nationality: string = 'Switzerland';

  firstName: string = 'Jake';

  calculTaxes() {
    this.basicIncome = this.basicIncome * 0.19;
  }

  onConfirmEmail(email: string) {
    console.log('outside ' + email);
  }

  @ViewChild('container', { read : ViewContainerRef })
  container?: ViewContainerRef;

  @ViewChild('template')
  template?: TemplateRef<any>;

  personArray = [
    { firstName : 'Jane', lastName : 'Die' },
    { firstName:  'John', lastName: 'Doe'}
  ];

  addPerson() {
    this.personArray.push({
      firstName: 'Jake', lastName: 'Doe'
    });
  }

  pages = 5;

  onClick() {
    if (this.template) {
      this.container?.clear();
      this.container?.createEmbeddedView(this.template, { variable : "Franck" });
    }
  }

  protected readonly last = last;
}
