import {Component} from '@angular/core';
import {PasswordSettings} from '../../types';
import {TestBed} from '@angular/core/testing';
import {PasswordSettingsComponent} from './password-settings.component';
import {FormsModule} from '@angular/forms';
import {createComponentFactory, Spectator} from '@ngneat/spectator';

@Component({
  standalone: false,
  selector: 'app-component-test',
  template: `
    <password-settings (settings-change)="onChange($event)"></password-settings>
  `
})
class TestComponent{
  onChange(settings: PasswordSettings) {}
}

@Component({
  standalone: false,
  selector: 'app-component-input-test',
  template: `<password-settings [default-settings]="{
                length: 45,
                symbols: true,
                numbers: true,
                uppercase: true
              }"></password-settings>`
})
class TestInputComponent {}

describe('PasswordSettingsComponent (TestBed)', () => {
  it("should represent settings in the html tags", async () =>{
    await TestBed.configureTestingModule({
      declarations: [TestComponent, PasswordSettingsComponent],
      imports: [FormsModule]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();

    await fixture.whenStable();

    expect(document.querySelector<HTMLInputElement>('#length')?.value).toBe(
      '20'
    );
    expect(fixture.nativeElement.querySelector('#numbers').checked).toBeFalse();
    expect(fixture.nativeElement.querySelector('#uppercase').checked).toBeFalse();
    expect(fixture.nativeElement.querySelector('#symbols').checked).toBeFalse();
  });

  it("should accept initial settings from the outside", async () => {
    TestBed.configureTestingModule({
      declarations: [PasswordSettingsComponent, TestInputComponent],
      imports: [FormsModule]
    });

    const fixture = TestBed.createComponent(TestInputComponent);
    fixture.autoDetectChanges();

    await fixture.whenStable();

    const lengthInput = fixture.nativeElement.querySelector('#length');
    const uppercaseInput = fixture.nativeElement.querySelector('#uppercase');
    const symbolsInput = fixture.nativeElement.querySelector('#symbols');
    const numbersInput = fixture.nativeElement.querySelector('#numbers');

    expect(lengthInput.value).toBe("45");
    expect(uppercaseInput.checked).toBeTrue();
    expect(symbolsInput.checked).toBeTrue();
    expect(numbersInput.checked).toBeTrue();
  });

  it("should emit an event with settings each time user changes html input", () => {
    TestBed.configureTestingModule({
      declarations: [PasswordSettingsComponent, TestComponent],
      imports: [FormsModule]
    });

    const fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    const component = fixture.componentInstance;

    const spy = spyOn(component, "onChange");

    const verifyCheckbox = (id: 'uppercase' | 'numbers' | 'symbols', expectedValues: PasswordSettings) => {
      fixture.nativeElement.querySelector('#' + id).click();
      expect(spy).toHaveBeenCalledWith(expectedValues);
    }

    verifyCheckbox('numbers', {
      length: 20,
      numbers: true,
      symbols: false,
      uppercase: false
    });

    verifyCheckbox('symbols', {
      length: 20,
      numbers: true,
      symbols: true,
      uppercase: false
    });

    verifyCheckbox('uppercase', {
      length: 20,
      numbers: true,
      symbols: true,
      uppercase: true
    });

    const lengthInput = fixture.nativeElement.querySelector('#length');
    lengthInput.value = "33";
    lengthInput.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith({
      length: 33,
      symbols: true,
      numbers: true,
      uppercase: true
    });
  });
});

describe('PasswordSettingsComponent (Spectator)', () => {
  let defaultSpectator: Spectator<TestComponent>;
  let inputSpectator: Spectator<TestInputComponent>;

  const createDefaultComponent = createComponentFactory({
    component: TestComponent,
    declarations: [PasswordSettingsComponent, TestComponent],
    imports: [FormsModule]
  });

  const createInputComponent = createComponentFactory({
    component: TestInputComponent,
    declarations: [PasswordSettingsComponent],
    imports: [FormsModule]
  });

  it("should represent settings in the html tags", async () => {
    defaultSpectator = createDefaultComponent();

    await defaultSpectator.fixture.whenStable();

    const lengthInput = defaultSpectator.query('#length');
    const numbersInput = defaultSpectator.query('#numbers');
    const uppercaseInput = defaultSpectator.query('#uppercase');
    const symbolsInput = defaultSpectator.query('#symbols');

    expect(lengthInput).toHaveValue("20");
    expect(numbersInput).not.toBeChecked();
    expect(uppercaseInput).not.toBeChecked();
    expect(symbolsInput).not.toBeChecked();
  });

  it("should accept initial settings from the outside", async () => {
    inputSpectator = createInputComponent();

    await inputSpectator.fixture.whenStable();

    expect(inputSpectator.query<HTMLInputElement>('#length')).toHaveValue("45");
    expect(inputSpectator.query<HTMLInputElement>('#numbers')).toBeChecked();
    expect(inputSpectator.query<HTMLInputElement>('#uppercase')).toBeChecked();
    expect(inputSpectator.query<HTMLInputElement>('#symbols')).toBeChecked();

  });

  it("should emit an event with settings each time user changes html input", () => {
    defaultSpectator = createDefaultComponent();

    const spy = spyOn(defaultSpectator.component, "onChange");

    const verifyCheckbox = (id : 'uppercase' | 'numbers' | 'symbols', expectedValues: PasswordSettings) => {
      defaultSpectator.click('#'+id);
      expect(spy).toHaveBeenCalledWith(expectedValues);
    }

    verifyCheckbox('numbers', {
      length: 20,
      numbers: true,
      symbols: false,
      uppercase: false
    });

    verifyCheckbox('symbols', {
      length: 20,
      numbers: true,
      symbols: true,
      uppercase: false
    });

    verifyCheckbox('uppercase', {
      length: 20,
      numbers: true,
      symbols: true,
      uppercase: true
    });

    defaultSpectator.typeInElement("42", "#length");
    expect(spy).toHaveBeenCalledWith({
      length: 42,
      numbers: true,
      symbols: true,
      uppercase: true
    });
  });
});
