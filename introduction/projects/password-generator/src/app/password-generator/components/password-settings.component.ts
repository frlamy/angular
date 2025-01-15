import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PasswordSettings} from '../../types';

@Component({
  selector: 'password-settings',
  standalone: false,

  template: `
    <label for="length">Longueur du mot de passe : {{ defaultSettings.length }}</label>
    <input (input)="onChange()" [(ngModel)]="defaultSettings.length" id="length" type="range" min="10" max="50" name="length"/>

    <label for="uppercase">
      <input (change)="onChange()" [(ngModel)]="defaultSettings.uppercase" role="switch" type="checkbox" name="uppercase" id="uppercase"/>
      Contiendra des majuscules
    </label>
    <label for="numbers">
      <input (change)="onChange()" [(ngModel)]="defaultSettings.numbers" role="switch" type="checkbox" name="numbers" id="numbers" />
      Contiendra des nombres
    </label>
    <label for="symbols">
      <input (change)="onChange()" [(ngModel)]="defaultSettings.symbols" role="switch" type="checkbox" name="symbols" id="symbols" />
      Contiendra des caractères spéciaux
    </label>
  `,
  styles: ``
})
export class PasswordSettingsComponent {
  @Input('default-settings')
  defaultSettings : PasswordSettings = {
    length : 20,
    uppercase : false,
    numbers: false,
    symbols: false,
  }

  @Output('settings-change')
  onChangeEvent = new EventEmitter<PasswordSettings>();

  onChange() {
    this.onChangeEvent.emit(this.defaultSettings);
  }
}
