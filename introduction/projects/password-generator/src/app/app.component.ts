import {Component, Output} from '@angular/core';
import {PasswordSettings} from './types';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  message: string = 'Cliquez sur le bouton "générer"';

  passwordSettings: PasswordSettings = {
    length: 15,
    uppercase: false,
    numbers: false,
    symbols: false
  }

  get passwordSettingsCopy() {
    return {...this.passwordSettings};
  }

  onSettingsChange(settings: PasswordSettings) {
    this.passwordSettings = settings;
    console.log(this.passwordSettings);
  }

  onClickGenerate() {
    this.message = "GENERATED_PASSWORD";
  }
}
