import {Component} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-recipe',
  template: `
    <h2>Recette :</h2>
    <form [formGroup]="recipe" (submit)="onSubmit()">
      <input
        formControlName="title"
        type="text"
        [class.is-valid]="title.touched && title.valid"
        [class.is-invalid]="title.touched && title.invalid"
        placeholder="Titre de la recette"
        class="form-control mb-2"
        minlength="4"
        required
        name="title"
        id="title"
      >
      <p class="invalid-feedback" *ngIf="title.touched && title.hasError('required')">Le titre de la recette est
        obligatoire</p>
      <p class="invalid-feedback" *ngIf="title.touched && title.hasError('minlength')">Le titre de la recette doit faire
        au moins 4 caractères</p>

      <h3>Liste d'ingrédients :
        <button (click)="addIngredients()" class="btn btn-sm btn-primary"><b>+ Ajouter</b></button>
      </h3>
      <div *ngIf="ingredients.length < 2" class="alert alert-primary">Vous devez sélectionner au moins 2 ingrédients
        pour votre recette
      </div>
      <div formArrayName="ingredients">
        <div *ngFor="let group of ingredients.controls ; let i = index"
             [formGroup]="group" class="row"
        >
          <div class="col">
            <input
              [class.is-invalid]="group.controls.name.invalid && group.controls.name.touched "
              type="text"
              class="form-control mb-2"
              placeholder="Nom de l'ingrédient"
              formControlName="name"
              required
              minlength="3"
            >
            <p
              class="invalid-feedback"
              *ngIf="group.controls.name.invalid && group.controls.name.touched && group.controls.name.hasError('required')"
            >
              Le nom de l'ingrédient est obligatoire
            </p>
            <p
              class="invalid-feedback"
              *ngIf="group.controls.name.invalid && group.controls.name.touched && group.controls.name.hasError('minlength')"
            >
              Le nom de l'ingrédient doit faire au moins 3 caractères
            </p>
          </div>

          <div class="col">
            <input
              [class.is-invalid]="group.controls.quantity.invalid && group.controls.quantity.touched"
              type="number"
              class="form-control mb-2"
              placeholder="Quantité"
              formControlName="quantity"
              required
            >
          </div>

          <div class="col">
            <select
              required
              class="form-control mb-2"
              formControlName="unity"
              name="unity"
              id="unity">
              <option value="grams">grammes</option>
              <option value="milimeters">millilitres</option>
              <option value="coffeeSpoon">càc</option>
              <option value="spoon">càs</option>
            </select>
          </div>

          <div class="col-1">
            <button class="btn-sm btn btn-outline-danger" (click)="removeIngredients(i)">X</button>
          </div>

        </div>

      </div>

      <button class="btn btn-info">Enregistrer</button>
    </form>
  `
})
export class RecipeComponent {
  recipe = new FormGroup({
    title: new FormControl('', []),
    ingredients: new FormArray<FormGroup<{
      name: FormControl,
      quantity: FormControl,
      unity: FormControl
    }>
    >([
      new FormGroup({
        name: new FormControl(''),
        quantity: new FormControl('', [positiveNumberValidator]),
        unity: new FormControl('grams')
      })
    ], [mustHave2ingredients]),
  });

  get title() {
    return this.recipe.controls.title;
  }

  get ingredients() {
    return this.recipe.controls.ingredients;
  }

  ngOnInit() {
    this.ingredients.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  addIngredients() {
    this.ingredients.push(new FormGroup({
      name: new FormControl(''),
      quantity: new FormControl(''),
      unity: new FormControl('grams')
    }));
  }

  removeIngredients(i: number) {
    this.ingredients.removeAt(i);
  }

  onSubmit() {
    console.log(this.recipe.value);
  }
}

const mustHave2ingredients: ValidatorFn = (control: AbstractControl) => {
  const array = control as FormArray;
  if (array.length < 2) {
    console.log(array.length);
    return {mustHave2ingredients: true}
  }
  return null;
}

const positiveNumberValidator: ValidatorFn = (control: AbstractControl<number>) => {
  if (control.value <= 0) {
    return {positiveNumberValidator: true}
  }
  return null;
}
