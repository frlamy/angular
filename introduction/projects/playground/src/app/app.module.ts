import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import {IfDirective} from './structural-directive/if.directive';
import {LoopDirective} from './structural-directive/loop.directive';
import {RepeatDirective} from './structural-directive/repeat.directive';
import {DeclarationComponent} from './components/declaration.component';
import {RecapComponent} from './components/recap.component';
import {TAUX_TVA, TaxesService} from './services/taxes.service';

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
    IfDirective,
    LoopDirective,
    RepeatDirective,
    DeclarationComponent,
    RecapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
  ],
  providers: [TaxesService, {
    provide: TAUX_TVA,
    useValue: 0.2
  }],
  exports: [
    SetClassesDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
