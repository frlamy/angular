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
import {MoviesComponent} from './components/movies/movies.component';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {MoviesService} from './components/movies/services/movies.service';
import {MoviesKeyInterceptor} from './components/movies/services/movies-key.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    BannedEmailValidator,
    UniqueEmailValidator,
    ConfirmPasswordValidator,
    ColorPickerComponent,
    ReactiveSignInComponent,
    RecipeComponent,
    MoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // <-- Use this instead of HttpClientModule
    MoviesService, {
      provide: HTTP_INTERCEPTORS,
      useClass: MoviesKeyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
