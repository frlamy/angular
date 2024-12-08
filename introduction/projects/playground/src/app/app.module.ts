import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HighlightDirective} from './directives/highlight.directive';
import {NoOpenDirective} from './directives/no-open.directive';
import {ConfirmDirective} from './directives/confirm.directive';
import {UserProfileComponent} from './components/user-profile.component';
import {NgOptimizedImage} from '@angular/common';
import {CounterComponent} from './components/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    NoOpenDirective,
    ConfirmDirective,
    UserProfileComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
