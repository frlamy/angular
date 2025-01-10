import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {FormsModule} from '@angular/forms';
import {PasswordDisplayComponent} from './components/password-display.component';
import {PasswordControlsComponent} from './components/password-controls.component';
import {PasswordSettingsComponent} from './components/password-settings.component';

describe('AppComponent (Spectator)', () => {
  let spectator: Spectator<AppComponent>;

  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [AppComponent, PasswordDisplayComponent, PasswordControlsComponent, PasswordSettingsComponent],
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
    expect(component.passwordSettings.uppercase).toBeTrue();

    spectator.click('#numbers');
    expect(component.passwordSettings.numbers).toBeTrue();

    spectator.click('#symbols');
    expect(component.passwordSettings.symbols).toBeTrue();
  });

  it('should update length when value is updated', async () => {
    spectator.typeInElement("33", '#length');
    expect(component.passwordSettings.length).toBe(33);
  });
});

describe('AppComponent (TestBed)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, PasswordDisplayComponent, PasswordControlsComponent, PasswordSettingsComponent],
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
    expect(component.passwordSettings.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.passwordSettings.numbers).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.passwordSettings.symbols).toBeTrue();
  });

  it('should update length data when updated', async () => {
    // Dès lors qu'on a un event, en l'occurence un input et que ce n'est pas une checkbox, il faut utiliser la fonction dispatchEvent() pour surveiller et tester l'input
    const length = fixture.nativeElement.querySelector('#length');
    length.value = 33;
    length.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.passwordSettings.length).toBe(33);
  })
});
