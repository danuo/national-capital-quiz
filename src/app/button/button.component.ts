import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ButtonListComponent } from '../button-list/button-list.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  animations: [
    trigger('buttonAnimation', [
      state('normal', style({ opacity: 1, transform: 'translateY(0)' })),
      state('removed', style({ opacity: 0, transform: 'translateY(500%)' })),
      transition('normal => removed', animate('300ms ease-out')),
      transition('removed => normal', animate('300ms ease-in')),
    ]),
  ],
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() id!: number;
  @Input() listComponent!: ButtonListComponent;

  onClick() {
    this.listComponent.removeItem(this.id);
  }
}
