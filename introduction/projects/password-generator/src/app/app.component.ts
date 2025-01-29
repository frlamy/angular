import {Component} from '@angular/core';
import {PasswordSettings} from './types';
import {PasswordGeneratorService} from './password-generator/services/password-generator.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  password: string = '';
  passwordSettings: PasswordSettings = {
    length: 20,
    uppercase: false,
    numbers: false,
    symbols: false
  }

  constructor(private passwordGeneratorService: PasswordGeneratorService) {
  }

  get passwordSettingsCopy() {
    return {...this.passwordSettings};
  }

  onSettingsChange(settings: PasswordSettings) {
    this.passwordSettings = settings;
  }

  onClickGenerate() {
    this.password = this.passwordGeneratorService.generate(this.passwordSettings);
  }
}
