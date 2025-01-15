import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {PasswordGeneratorModule} from './password-generator/password-generator.module';

@NgModule({
  declarations: [AppComponent],
  imports: [PasswordGeneratorModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
