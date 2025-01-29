import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  standalone: false,
  selector: 'color-picker',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ColorPickerComponent,
      multi: true,
    }
  ],
  template: `
    <h2>{{ label }}</h2>
    <ul>
      <li [style.background-color]="'blue'" [class.selected]="color === 'blue'" (click)="select('blue')"></li>
      <li [style.background-color]="'green'" [class.selected]="color === 'green'" (click)="select('green')"></li>
      <li [style.background-color]="'orange'" [class.selected]="color === 'orange'" (click)="select('orange')"></li>
    </ul>
  `,
  styles: `
    ul {
      display: flex;
      gap: 1em;
      padding: 0;
      list-style-type: none;
    }

    li {
      border-radius: 5px;
      width: 50px;
      height: 50px;
      padding: 0;
      background-color: red;
      cursor: pointer;
    }

    li.selected {
      border: 2px solid rgba(255, 255, 255, 0.7);
    }
  `
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  color: 'blue' | 'green' | 'orange' = 'blue';

  @Input()
  label: string = 'Choisissez une couleur :';

  ngOnInit(): void {
  }

  select(color: 'blue' | 'green' | 'orange') {
    this.color = color;
    this.onChange(this.color);
    this.onTouch();
  }

  onChange: (value: string) => void = () => {
  };

  onTouch: () => void = () => {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    this.color = value as any;
  }
}
