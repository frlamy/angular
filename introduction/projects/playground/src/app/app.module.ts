import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HighlightDirective} from './directives-attributes/highlight.directive';
import {NgOptimizedImage} from '@angular/common';
import {NoOpenDirective} from './directives-attributes/no-open.directive';
import {ConfirmDirective} from './directives-attributes/confirm.directive';
import {UserProfileComponent} from './components/user-profile.component';
import {CounterComponent} from './components/counter.component';
import {ModelChangeDirective} from './directives-attributes/model-change.directive';
import {FormsModule} from '@angular/forms';
import {SetClassesDirective} from './directives-attributes/set-classes.directive';
import {ForceLowerDirective} from './directives-attributes/force-lower.directive';
import {NewsletterComponent} from './components/newsletter.component';
import {CardComponent} from './components/card.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    CounterComponent,
    NewsletterComponent,
    CardComponent,
    HighlightDirective,
    NoOpenDirective,
    ConfirmDirective,
    ModelChangeDirective,
    SetClassesDirective,
    ForceLowerDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
