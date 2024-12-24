import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  ngViewOnInit() {}

  title = 'password-generator';

  message:string = 'Cliquez sur le bouton "générer"';

  length: number = 20;
  uppercase: boolean = false;
  numbers: boolean = false;
  symbols: boolean = false;

  onChangeSetting(settingName: string, settingValue: boolean) {
    if (settingName !== "uppercase" && settingName !== "numbers" && settingName !== "symbols") {
      return;
    }
    this[settingName] = settingValue;
  }

  onChangeLength(event: Event) {
    this.length = +(event.target as HTMLInputElement).value;
  }

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
