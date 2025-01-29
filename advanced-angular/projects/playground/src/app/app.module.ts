import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BannedEmailValidator} from './directives/banned-email.directive';
import {UniqueEmailValidator} from './directives/unique-email.directive';
import {ConfirmPasswordValidator} from './directives/confirm-password.directive';
import {ColorPickerComponent} from './components/color-picker.component';
import {SignInComponent} from './components/sign-in.component';
import {AppComponent} from './app.component';
import {ReactiveSignInComponent} from './components/reactive-sign-in.component';
import {RecipeComponent} from './components/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    BannedEmailValidator,
    UniqueEmailValidator,
    ConfirmPasswordValidator,
    ColorPickerComponent,
    ReactiveSignInComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
