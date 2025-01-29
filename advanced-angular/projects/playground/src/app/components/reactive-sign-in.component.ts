import {Component} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-reactive-sign-in',
  templateUrl: 'reactive-sign-in.component.html',
  styles: ``
})
export class ReactiveSignInComponent {
  signIn = new FormGroup({
    favoriteColor: new FormControl(''),
    languages: new FormArray<FormGroup>([]),
    email: new FormControl('', [
        // Validators.required,
        // Validators.email,
        createBannedEmailValidator('test@test.com')
      ], [uniqueEmailValidator]
    ),
    security: new FormGroup(
      {
        password: new FormControl('', [
          // Validators.required,
          // Validators.minLength(4)
        ]),
        confirm: new FormControl('')
      },
      {
        validators: [confirmPasswordValidator]
      }
    ),
  });

  /** Getters */

  get languages() {
    return this.signIn.controls.languages;
  }

  get security() {
    return this.signIn.controls.security;
  }

  get email() {
    return this.signIn.controls.email;
  }

  get password() {
    return this.security.controls.password;
  }

  get confirm() {
    return this.security.controls.confirm;
  }

  ngOnInit() {
    // valueChanges est un event emitter qui envoie un signal à chaque fois qu'une valeur du formulaire va changer //
    this.signIn.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.signIn.controls.favoriteColor.valueChanges.subscribe((value) => {
      console.log(value);
      if (value === 'green') {
        this.languages.addValidators(mustHave2LanguagesValidator);
        this.languages.updateValueAndValidity();
        return;
      }

      this.languages.removeValidators(mustHave2LanguagesValidator);
      this.languages.updateValueAndValidity();
    });

    // On peut donner les validators directement à la création du formulaire (voir au dessus)
    // this.email.addValidators([
    // requiredValidator,
    // bannedEmailValidator,
    // Validators.required,
    // Validators.email
    // ]);
    // this.addLanguage();

    /**
     * setValue - attend la même structure que le formulaire
     * patchValue - permet de passer juste une info du formulaire
     */

    /**
     * this.signIn.setValue({
     *  email: "Anon@mail.net",
     *  security: {
     *    password: "",
     *    confirm: "Toto"
     *  },
     *  languages: [
     *    {name: "Typescript", level: "debutant"}
     *  ]
     * });
     * this.signIn.patchValue({
     *   email: "Anon@mail.net"
     *  })
     */

  }

  addLanguage() {
    this.languages.push(new FormGroup({
        name: new FormControl(),
        level: new FormControl('debutant')
      })
    );
  }

  removeLanguage(i: number) {
    this.languages.removeAt(i);
  }

  onSubmit() {
    console.log(this.signIn.value);
  }
}

const createBannedEmailValidator = (bannedEmail: string) => {
  const bannedEmailValidator: ValidatorFn = (control: AbstractControl<string>) => {
    if (control.value === bannedEmail) {
      return {bannedEmail: true}
    }
    return null;
  }

  return bannedEmailValidator;
}

// Création de validateurs personnalisés : C'est équivalent à Validators.email
const requiredValidator: ValidatorFn = (control: AbstractControl<string>) => {
  if (control.value === '') {
    return {required: true}
  }
  return null;
}

// Validateurs asynchrones
const uniqueEmailValidator: AsyncValidatorFn = async (control: AbstractControl<string>) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users?email=' + control.value);
  const userArray = await response.json();
  if (userArray.length > 0) {
    return {uniqueEmail: true};
  }
  return null;
  //?email=Sincere@april.biz
}

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl<{ password: string, confirm: string }>) => {
  const password = control.get('password');
  const confirm = control.get('confirm');

  if (password?.value !== confirm?.value) {
    confirm?.setErrors({confirmPassword: true})
    return {confirmPassword: true};
  }
  return null;
}

const mustHave2LanguagesValidator: ValidatorFn = (control: AbstractControl) => {
  const array = control as FormArray;
  if (array.length < 2) {
    return {mustHave2Languages: true}
  }

  return null;
}
