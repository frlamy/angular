import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {FormsModule} from '@angular/forms';

describe('AppComponent (Spectator)', () => {
  let spectator: Spectator<AppComponent>;

  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [AppComponent],
    imports: [FormsModule],
  });

  beforeEach(() => {
    // La fixture est intégrée à Spectator
    spectator = createComponent();
    component = spectator.component;
  });

  it('should display right title for article', () => {
    expect(spectator.query('article')?.textContent).toBe('Cliquez sur le bouton "générer"');
  });

  it('should change article textContent when button is clicked', async () => {
    spectator.click('button');
    expect(spectator.query('article')?.textContent).toBe('GENERATED_PASSWORD');
  });

  it('should update data when checkboxes are checked', async () => {
    spectator.click('#uppercase');
    expect(component.uppercase).toBeTrue();

    spectator.click('#numbers');
    expect(component.numbers).toBeTrue();

    spectator.click('#symbols');
    expect(component.symbols).toBeTrue();
  });

  it('should update length when value is updated', async () => {
    spectator.typeInElement("33", '#length');
    expect(component.length).toBe(33);
  });
});

describe('AppComponent (TestBed)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it('should display right title for article', async () => {
    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('Cliquez sur le bouton "générer"');
  })

  it('should change article textContent when button is clicked', async () => {
    const button = fixture.nativeElement.querySelector('button');
    const article = fixture.nativeElement.querySelector('article');
    button.click();
    expect(article.textContent).toBe('GENERATED_PASSWORD');
  });

  it('should update data when checkboxes are checked', async () => {
    fixture.nativeElement.querySelector('#uppercase').click();
    expect(component.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.numbers).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.symbols).toBeTrue();
  });

  it('should update length data when updated', async () => {
    // Dès lors qu'on a un event, en l'occurence un input et que ce n'est pas une checkbox, il faut utiliser la fonction dispatchEvent() pour surveiller et tester l'input
    const length = fixture.nativeElement.querySelector('#length');
    length.value = 33;
    length.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.length).toBe(33);
  })
});
