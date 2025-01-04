import { Component } from '@angular/core';

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
}
