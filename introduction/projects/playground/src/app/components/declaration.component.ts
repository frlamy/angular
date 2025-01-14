import {Component} from '@angular/core';
import {TaxesService} from '../services/taxes.service';

@Component({
  standalone: false,
  selector: 'declaration-component',
  template: `
    <h3>Déclarations des impôts :</h3>
    <div class="grid">
      <input #income type="number" placeholder="Déclarez vos impôts">
      <article>Vos impôts : {{ total }} €</article>
    </div>
    <button (click)="onClick(income.valueAsNumber)">Déclarer</button>
  `,
  // Provide par la class
  // providers: [
  //   {
  //     provide: TaxesService,
  //     useClass: TaxesService
  //   }
  // ]
  // Provide par l'instance
  // providers: [
  //   {
  //     provide: TaxesService,
  //     useValue: service (une variable)
  //   }
  // ]
  // Provide par la factory
  // providers: [
  //   {
  //     provide: TaxesService,
  //     useFactory: () => {
  //       return new TaxesService();
  //     }
  //   }
  // ]
})
export class DeclarationComponent {
  constructor(private service: TaxesService) {  }

  onClick(income: number) {
    this.total = this.service.calculate(income);
  }

  total: number = 0;
}
