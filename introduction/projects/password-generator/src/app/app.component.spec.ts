import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Spectator, createComponentFactory} from '@ngneat/spectator';

describe('AppComponent (Spectator)', () => {
  let spectator: Spectator<AppComponent>;

  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [AppComponent]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should work', () => {
    expect(spectator.query('article')).toHaveText('Cliquez sur le bouton "générer"');
  });

  it('should change message when button is clicked and be : GENERATED_PASSWORD', async () => {
    spectator.click('button');
    expect(spectator.query('article')?.textContent).toBe('GENERATED_PASSWORD');
  });

  it('should update settings when checkboxes are clicked', async () => {

    spectator.click('#uppercase');
    expect(component.uppercase).toBeTrue();

    spectator.click('#numbers');
    expect(component.numbers).toBeTrue();

    spectator.click('#symbols');
    expect(component.symbols).toBeTrue();
  })

  it('should update settings when value is updated', async () => {
    // When it's an input, we have to call dispatchEvent(new Event('input'));
    spectator.typeInElement("33", "#length");
    expect(component.length).toEqual(33);
  })

});

describe('AppComponent (TestBed)', () => {
  let fixture: ComponentFixture<AppComponent>;

  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    fixture.autoDetectChanges();

    component = fixture.componentInstance;
  })

  it('should work', async () => {
    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('Cliquez sur le bouton "générer"');
  });

  it('should change message when button is clicked and be : GENERATED_PASSWORD', async () => {
    const button = fixture.nativeElement.querySelector('button');

    button.click();

    const article = fixture.nativeElement.querySelector('article');

    expect(article.textContent).toBe('GENERATED_PASSWORD');
  });

  it('should update settings when checkboxes are clicked', async () => {

    fixture.nativeElement.querySelector('#uppercase').click();
    expect(component.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.numbers).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.symbols).toBeTrue();
  })

  it('should update settings when value is updated', async () => {
    // When it's an input, we have to call dispatchEvent(new Event('input'));
    const length = fixture.nativeElement.querySelector('#length');
    length.value = 33;
    length.dispatchEvent(new Event('input'));

    expect(component.length).toEqual(33);
  })
});
