import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-sign-in',
  templateUrl: 'sign-in.component.html',
  styles: ``
})
export class SignInComponent {
  @ViewChild('email')
  emailInput?: ElementRef<HTMLInputElement>;

  data = {
    email: 'john.doe@mail.com',
    password: 'password',
    color: 'blue',
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
