import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'user-profile',
  template: `
    <!--  CLASS BINDING : Quand on ajoute dynamiquement une class sur un élément html, en fonction d'une condition JS  -->
    <h3 [class.hired]="isHired" [class.not-hired]="!isHired">{{ firstName | titlecase }} {{ lastName | uppercase }}</h3>

    <!--    PROPERTY BINDING : Quand un attribut est entouré de crochet, c'est une valeur JS, on peut y mettre une variable, une fonction, une ternaire-->
    <img [src]="avatar" alt="user-picture">
    Job : <strong>{{ job | titlecase }} ({{ salary | currency : 'EUR' }})</strong>

    <!--  EVENT BINDING : Quand on lie une fonction directement à un event du template  -->
    <button *ngIf="!isHired" (click)="onClickButton()">Hire !</button>
    <button *ngIf="isHired" (click)="onClickButton()">Do not Hire !</button>

    <input #newFirstName (keydown.enter)="changeFirstName()" placeholder="New first name" type="text">
    <button (click)="changeFirstName()">Change 1st name</button>
  `,
  styleUrl: '../css/user-profile.component.css',
  standalone: false,
})
export class UserProfileComponent {
  ngOniInit() {}

  @Input('first-name')
  firstName: string = '';

  @Input('last-name')
  lastName: string = '';

  @Input('job')
  job: string = '';

  @Input('salary')
  salary: number = 2700;

  @Input('hired')
  isHired!: boolean;

  avatar: string = "https://placehold.co/30";

  @ViewChild('newFirstName')
  newFirstName?: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    if (this.newFirstName) {
      this.newFirstName.nativeElement.value = 'Jane';
    }
  }

  onClickButton() {
    this.isHired = !this.isHired;
  }

  changeFirstName() {
    if (this.newFirstName) {
      this.firstName = this.newFirstName.nativeElement.value;
    }
  }

}
