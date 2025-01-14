import {Inject, Injectable, InjectionToken} from '@angular/core';

export const TAUX_TVA = new InjectionToken("Le taux de TVA")

@Injectable()
export class TaxesService {

  // @Inject une chaine de caractère qu'on peut définir dans le provider. Là TAUX_TVA est dans le app.module
  constructor(@Inject(TAUX_TVA) private tauxTva: number) {
      console.log('La TVA est : ', this.tauxTva);
  }

  total = 0;

  calculate(income: number) {
    this.total += income;
    return income * this.tauxTva;
  }
}
