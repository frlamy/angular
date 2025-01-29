import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

@Directive({
  standalone: false,
  selector: '[ngModel][uniqueEmail], [formControl][uniqueEmail], [formControlName][uniqueEmail]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueEmailValidator,
      multi: true,
    }
  ]
})
export class UniqueEmailValidator implements AsyncValidator {

  constructor() {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return fetch('https://jsonplaceholder.typicode.com/users?email=' + control.value)
      .then(response => response.json())
      .then((userArray: any[]) => {
        if (userArray.length > 0) {
          return {uniqueEmail: true}
        }
        return null;
      })
    //?email=Sincere@april.biz
  }

}
