import {NgModule} from '@angular/core';
import {PasswordSettingsComponent} from './components/password-settings.component';
import {PasswordControlsComponent} from './components/password-controls.component';
import {PasswordDisplayComponent} from './components/password-display.component';
import {PasswordGeneratorService} from './services/password-generator.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    PasswordSettingsComponent,
    PasswordControlsComponent,
    PasswordDisplayComponent
  ],
  exports: [
    PasswordSettingsComponent,
    PasswordControlsComponent,
    PasswordDisplayComponent
  ],
  providers: [
    PasswordGeneratorService
  ],
  imports: [BrowserModule, FormsModule],
})
export class PasswordGeneratorModule {

}
