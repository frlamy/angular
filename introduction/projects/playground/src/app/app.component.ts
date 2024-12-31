import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  basicIncome = 100;

  onColorChange(color: string) {
    console.log('ColorChange : ' + color);
  }

  calculTaxes() {
    const tax = this.basicIncome * 0.19;
    console.log(tax);
  }
}
