import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PasswordControlsComponent} from './password-controls.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {Component, Input} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-test-component',
  template: `
    <password-controls
      [password]=password
      (generate)="onClickGenerate()"
    >
    </password-controls>
  `,
})
class TestComponent {
  password: string = '';
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

  it('should not show button copy element', () => {
    expect(fixture.nativeElement.querySelector('#copy')).toBeNull();
  })

  it('should create a button copy element when generate button is clicked', () => {
    component.password = "MOCK_PASSWORD";
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#copy')).toBeTruthy();
  });

  it('should copy the password when the user clicks the button #copy', () => {
    const spy = spyOn(navigator.clipboard, "writeText");
    component.password = "MOCK_PASSWORD";
    fixture.detectChanges();
    fixture.nativeElement.querySelector('#copy').click();
    expect(spy).toHaveBeenCalledWith("MOCK_PASSWORD");
    expect(fixture.nativeElement.querySelector('#copy-message').textContent).toBe('Le mot de passe a été copié');
  });

  it('should change the copy message when the password is generated again', () => {
    const spy = spyOn(navigator.clipboard, "writeText");
    component.password = "MOCK_PASSWORD";
    fixture.detectChanges();

    fixture.nativeElement.querySelector('#copy').click();
    expect(fixture.nativeElement.querySelector('#copy-message')).toBeTruthy();

    component.password = "NEW_MOCK_PASSWORD";
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#copy-message')).toBeNull();

    fixture.nativeElement.querySelector('#copy').click();
    expect(fixture.nativeElement.querySelector('#copy-message')).toBeTruthy();
  });
});

describe('PasswordControlsComponent (Spectator)', () => {
  let spectator: Spectator<TestComponent>;
  let component: TestComponent;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [PasswordControlsComponent],
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

  it('should show a copy button if a password exists', () => {
    component.password = 'MOCK_PASSWORD';
    spectator.detectChanges();
    expect(spectator.query('#copy')).toExist();
  });

  it('should not show button copy element', () => {
    expect(spectator.query('#copy')).toBeNull();
  });

  it('should create a button copy element when generate button is clicked', () => {
    component.password = "MOCK_PASSWORD";
    spectator.fixture.detectChanges();
    expect(spectator.query('#copy')).toBeTruthy();
  });

  it('should copy the password when the user clicks the button #copy', () => {
    const spy = spyOn(navigator.clipboard, "writeText");
    component.password = "MOCK_PASSWORD";
    spectator.fixture.detectChanges();
    spectator.click('#copy');
    expect(spy).toHaveBeenCalledWith("MOCK_PASSWORD");
    expect(spectator.query('#copy-message')).toHaveText('Le mot de passe a été copié');
  });

  it('should change the copy message when the password is generated again', () => {
    const spy = spyOn(navigator.clipboard, "writeText");
    component.password = "MOCK_PASSWORD";
    spectator.fixture.detectChanges();
    spectator.click('#copy');
    expect(spectator.query('#copy-message')).toExist();
    component.password = "NEW_MOCK_PASSWORD";
    spectator.fixture.detectChanges();
    expect(spectator.query('#copy-message')).toBeNull();
    spectator.click('#copy');
    expect(spectator.query('#copy-message')).toExist();
  });
});
