import {Component} from '@angular/core';
import {TaxesService} from '../services/taxes.service';

@Component({
  standalone: false,
  selector: 'recap-component',
  template: `
    <h3>Récapitulatif</h3>
    <p>Vous avez déclaré {{ total }}</p>
  `,
})
export class RecapComponent {
  constructor(private taxesService: TaxesService) {}

  get total() {
    return this.taxesService.total;
  }
}
