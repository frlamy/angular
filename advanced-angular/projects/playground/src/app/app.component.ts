import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('email')
  emailInput?: ElementRef<HTMLInputElement>;

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
