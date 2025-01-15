import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PasswordDisplayComponent} from './password-display.component';
import {createHostFactory, SpectatorHost} from '@ngneat/spectator';
import {Component} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-test-component',
  template: `
    <password-display password="MOCK_PASSWORD"></password-display>
  `
})
class TestComponent {}

@Component({
  standalone: false,
  selector: 'app-test-no-input-component',
  template: `
    <password-display></password-display>
  `
})
class TestNoInputComponent {}

describe('PasswordDisplayComponent (TestBed)', () => {
  let fixture: ComponentFixture<TestComponent>;

  it('should display the input message', async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordDisplayComponent, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();

    const article = fixture.nativeElement.querySelector('article');
    fixture.detectChanges();
    expect(article.textContent).toContain('MOCK_PASSWORD');
  });

  it('should display a message when no password is given', async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordDisplayComponent, TestNoInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestNoInputComponent);
    fixture.autoDetectChanges();

    const article = fixture.nativeElement.querySelector('article');
    fixture.detectChanges();
    expect(article.textContent).toContain('Cliquez sur le bouton "Générer"');
  });
});

describe('PasswordDisplayComponent (Spectator)', () => {
  let spectator: SpectatorHost<PasswordDisplayComponent>;

  const createComponent = createHostFactory({
    component: PasswordDisplayComponent
  });

  it('should display the input message', () => {
    spectator = createComponent(`
      <password-display password="MOCK_PASSWORD"></password-display>
    `)
    expect(spectator.query('article')).toHaveText('MOCK_PASSWORD');
  });

  it('should display a message when no password is given', () => {
    spectator = createComponent(`
      <password-display></password-display>
    `)
    expect(spectator.query('article')).toHaveText('Cliquez sur le bouton "Générer"');
  });
});
