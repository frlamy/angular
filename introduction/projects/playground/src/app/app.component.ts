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

  calculTaxes() {
    this.basicIncome = this.basicIncome * 0.19;
  }
}
