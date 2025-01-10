import {ForceLowerDirective} from './force-lower.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, input} from '@angular/core';
import {createComponentFactory, createDirectiveFactory, Spectator, SpectatorDirective} from '@ngneat/spectator';

@Component({
  standalone: false,
  selector: 'app-test',
  template: `
    <input type="text" placeholder="firstName" force-lower value="MOCK_VALUE">
  `
})
class TestComponent {}

describe('ForceLowerDirective (TestBed)', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForceLowerDirective, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it ('should lower initial value', async () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('mock_value');
  });

  it ('should update value and keep it lower', async () => {
    let myInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    myInput.value = 'FRANCK';
    myInput.dispatchEvent(new Event('input'));

    expect(myInput.value).toBe('franck');
  });
});

describe('ForceLowerDirective (Spectator)', () => {
  let spectator: Spectator<TestComponent>;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [ForceLowerDirective]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it ('should lower initial value', async () => {
    expect(spectator.query<HTMLInputElement>('input')).toHaveValue('mock_value');
  });

  it ('should update value and keep it lower', async () => {
    spectator.typeInElement("FRANCK", 'input');
    expect(spectator.query<HTMLInputElement>('input')).toHaveValue('franck');
  });
});

describe('ForceLowerDirective (SpectatorDirective)', () => {
  let spectatorDirective: SpectatorDirective<ForceLowerDirective>;

  const createDirective = createDirectiveFactory({
    directive: ForceLowerDirective
  });

  beforeEach(() => spectatorDirective = createDirective(`<input type="text" placeholder="firstName" force-lower value="MOCK_VALUE">`));

  it ('should lower initial value', async () => {
    expect(spectatorDirective.query<HTMLInputElement>('input')).toHaveValue('mock_value');
  });

  it ('should update value and keep it lower', async () => {
    spectatorDirective.typeInElement("FRANCK", 'input');
    expect(spectatorDirective.query<HTMLInputElement>('input')).toHaveValue('franck');
  });

});
