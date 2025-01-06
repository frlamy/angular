import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PasswordDisplayComponent} from './password-display.component';
import {createComponentFactory, createHostFactory, Spectator, SpectatorHost} from '@ngneat/spectator';
import {Component, createComponent} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-test-component',
  template: `
    <password-display message="MOCK_MESSAGE"></password-display>
  `
})
class TestComponent {}

describe('PasswordDisplayComponent (TestBed)', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordDisplayComponent, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
  });

  it('should display the input message', () => {

    const article = fixture.nativeElement.querySelector('article');
    fixture.detectChanges();

    expect(article.textContent).toContain('MOCK_MESSAGE');
  })
});

describe('PasswordDisplayComponent (Spectator)', () => {
  let spectator: SpectatorHost<PasswordDisplayComponent>;

  const createComponent = createHostFactory({
    component: PasswordDisplayComponent
  });

  beforeEach(() => {
    spectator = createComponent(`
      <password-display message="MOCK_MESSAGE"></password-display>
    `)
  });

  it('should display the input message', () => {
    expect(spectator.query('article')).toHaveText('MOCK_MESSAGE');
  });
});
