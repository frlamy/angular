import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'user-profile',
  standalone: false,
  template: `
    <!--  CLASS BINDING : Quand on ajoute dynamiquement une class sur un élément html, en fonction d'une condition JS  -->
    <h3 [class.hired]="isHired" [class.not-hired]="!isHired">{{ firstName | titlecase }} {{ lastName | uppercase }}</h3>

    <!--    PROPERTY BINDING : Quand un attribut est entouré de crochet, c'est une valeur JS, on peut y mettre une variable, une fonction, une ternaire-->
    <img [src]="avatar" alt="user-picture">
    Job : <strong>{{ job | titlecase }} ({{ salary | currency :'EUR' : 'symbol' }} / mois)</strong>

    <button *ngIf="!isHired" (click)="onClickButton()">Hire</button>

    <!--  EVENT BINDING : Quand on lie une fonction directement à un event du template  -->
    <button *ngIf="isHired" (click)="onClickButton()">Reject</button>

    <!-- VARIABLE DE TEMPLATE : A utiliser avec @ViewChild, et utilisable uniquement après l'utilisation de la vue => Cf. ngAfterViewInit(){}   -->
    <input #newFirstName (keydown.space)="onSpaceKeyDown($event)" (keydown.enter)="changeFirstName()" type="text" placeholder="New name">

    <button (click)="changeFirstName()" >Change name</button>

    <hr>
  `,
  styleUrl: '../css/user-profile.component.css'
})
export class UserProfileComponent {
  ngOnInit() {}

  ngAfterViewInit() {
    if (this.newFirstName) {
      this.newFirstName.nativeElement.value = 'Jake';
    }
  }

  @ViewChild('newFirstName')
  newFirstName ?: ElementRef<HTMLInputElement>;

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

  changeFirstName() {
    const newValue: string|undefined = this.newFirstName?.nativeElement?.value;
    if (newValue) {
      this.firstName = newValue;
    }
  }

  onSpaceKeyDown(event: Event) {
    console.log('Backspace is triggered');
  }
}
