import {TestBed} from '@angular/core/testing';
import {DeclarationComponent} from './declaration.component';
import {TAUX_TVA, TaxesService} from '../services/taxes.service';
import {createComponentFactory, Spectator} from '@ngneat/spectator';

class FakeService {
  calculate(income: number) {
    return income + 500;
  }
}

describe('Declaration component (TestBed)', () => {
  it("should show taxes results", async () => {
    await TestBed.configureTestingModule({
     declarations: [DeclarationComponent],
      providers: [TaxesService, { provide: TAUX_TVA, useValue: 0.2}]
    }).compileComponents();

    // const fakeService = new FakeService();
    // Comment utiliser un faux service pour les tests :
    // TestBed.overrideComponent(DeclarationComponent, {
    //   set: {
    //     providers: [
          // With factory
          // {
          //   provide: TaxesService,
          //   useFactory: () => {
          //     return new FakeService();
          //   }
          // }
          // With useClass
          // { provide: TaxesService, useClass: FakeService }
          // With useValue
          // { provide: TaxesService, useValue: fakeService }
    //     ],
    //   }
    // });

    const fixture = TestBed.createComponent(DeclarationComponent);
    fixture.autoDetectChanges();

    // J'indique un montant dans l'input
    const input = fixture.nativeElement.querySelector('input');
    input.value = 1000;


    // Injecter le service depuis la fixture
    // const service = fixture.debugElement.injector.get(TaxesService);

    // Mais on peut aussi récupérer le service s'il est déclaré dans les providers du TestBed.configureTestingModule() ligne 13
    // En lui passant aussi la value TAUX_TVA !
    const service = TestBed.inject(TaxesService);


    // Faire tourner une fonction spécifique, on peut la redéclarer ici
    // service.calculate = (income: number) => {
    //   return income * 0.3;
    // }

    // Utiliser un espion
    const spy = spyOn(service, 'calculate');

    spy.and.callFake((income: number) => {
      return income * 0.5;
    });

    fixture.nativeElement.querySelector('button').click();

    expect(fixture.nativeElement.querySelector('article').textContent).toBe('Vos impôts : 500 €');
  });
});

describe('DeclarationComponent (Spectator)', () => {
  let spectator: Spectator<DeclarationComponent>;
  const createSpectator = createComponentFactory({
    component: DeclarationComponent,
    providers: [TaxesService, { provide: TAUX_TVA, useValue: 0.2 }],
    mocks: [TaxesService] // inclus un spy
  });

  it ('should show taxes results', () => {
    spectator = createSpectator();

    const service = spectator.inject(TaxesService);
    service.calculate.and.returnValue(400);
    // Si on veut utiliser le spy plutôt que les mocks, schant que le mocks intègre déjà le spy
    // const spy = spyOn(service, 'calculate');
    // spy.and.returnValue(400);

    spectator.typeInElement('2000', 'input');
    spectator.click('button');

    expect(spectator.query('article')).toHaveText('Vos impôts : 400 €');
  });

});
