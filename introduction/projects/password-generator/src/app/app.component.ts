import {Component, HostBinding, Input} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  message:string = 'Cliquez sur le bouton "générer"';

  length: number = 20;
  uppercase: boolean = false;
  numbers: boolean = false;
  symbols: boolean = false;

  onClickGenerate() {
    this.message = "GENERATED_PASSWORD";
    console.table({
      uppercase: this.uppercase,
      numbers: this.numbers,
      symbols: this.symbols,
      length: this.length
    })
  }
}
