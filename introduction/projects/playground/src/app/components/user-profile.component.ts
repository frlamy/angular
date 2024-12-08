import {Component, HostListener, Input} from '@angular/core';

@Component({
  selector: 'user-profile',
  standalone: false,
  template: `
    <h3 [class.hired]="isHired" [class.not-hired]="!isHired">{{ firstName | titlecase }} {{ lastName | uppercase }}</h3>
    <img [src]="avatar" alt="user-picture">
    Job : <strong>{{ job | titlecase }} ({{ salary | currency :'EUR' : 'symbol' }} / mois)</strong>
    <button *ngIf="!isHired" (click)="onClickButton()">Hire</button>
    <button *ngIf="isHired" (click)="onClickButton()">Reject</button>
    <input (keydown.enter)="onEnterKeyDown($event)" (keydown.backspace)="onBackSpaceKeyDown($event)" type="text" placeholder="New name">
    <hr>
  `,
  styles: [`
    .hired {
      color: green;
    }

    .not-hired {
      color: red;
    }
  `]
})
export class UserProfileComponent {
  ngOnInit() {}

  @Input('first-name')
  firstName: string = '';

  @Input('last-name')
  lastName: string = '';

  @Input()
  job: string = '';

  @Input()
  salary: string = '';

  @Input('hired')
  isHired!: boolean;

  avatar: string = "https://placehold.co/30"

  onClickButton() {
    this.isHired = !this.isHired;
  }

  onEnterKeyDown(event: Event) {
      console.log('Enter is triggered');
  }

  onBackSpaceKeyDown(event: Event) {
    console.log('Backspace is triggered');
  }
}
