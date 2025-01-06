import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PasswordControlsComponent} from './password-controls.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {Component} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-test-component',
  template: `
    <password-controls (generate)="onClickGenerate()" button-text="Générer"></password-controls>
  `,
})
class TestComponent {
  onClickGenerate() {}
}

describe('PasswordControlsComponent (Testbed)', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordControlsComponent, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it('should emit an event when button is clicked', () => {
    const spy = spyOn(component, "onClickGenerate");
    fixture.nativeElement.querySelector('button').click();
    expect(spy).toHaveBeenCalled();
  });
});

describe('PasswordControlsComponent (Spectator)', () => {
  let spectator: Spectator<TestComponent>;
  let component: TestComponent;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [PasswordControlsComponent, TestComponent],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should emit an event when button is clicked', () => {
    const spy = spyOn(component, "onClickGenerate");
    spectator.click('button');
    expect(spy).toHaveBeenCalled();
  });

})
