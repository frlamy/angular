import {Component} from '@angular/core';
import {PasswordSettings} from './types';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  password: string = 'Cliquez sur le bouton "générer"';

  passwordSettings: PasswordSettings = {
    length: 0,
    uppercase: false,
    numbers: false,
    symbols: false
  }

  get passwordSettingsCopy() {
    return {...this.passwordSettings};
  }

  onSettingsChange(settings: PasswordSettings) {
    this.passwordSettings = settings;
  }

  onClickGenerate() {
    this.password = "GENERATED_PASSWORD";
  }
}
