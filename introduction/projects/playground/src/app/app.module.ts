import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HighlightDirective} from './directives-attributes/highlight.directive';
import {NgOptimizedImage} from '@angular/common';
import {NoOpenDirective} from './directives-attributes/no-open.directive';
import {ConfirmDirective} from './directives-attributes/confirm.directive';
import {UserProfileComponent} from './components/user-profile.component';
import {CounterComponent} from './components/counter-component';
import {ModelChangeDirective} from './directives-attributes/model-change.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    CounterComponent,
    HighlightDirective,
    NoOpenDirective,
    ConfirmDirective,
    ModelChangeDirective,
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
