import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ButtonListComponent } from '../button-list/button-list.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  animations: [
    trigger('buttonAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate(1000, style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() label!: string;
  @Input() id!: number;
  @Input() state!: string;
  @Input() parent!: ButtonListComponent;

  outlined = true;
  severity = '';

  ngOnInit(): void {
    this.updateFields();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateFields();
  }

  updateFields(): void {
    // outlined
    this.outlined = this.state != 'selected';

    // severity
    if (this.state == 'red') {
      this.severity = 'warning';
    } else {
      this.severity = '';
    }
  }

  onClick() {
    this.parent.handleClick(this.id);
  }
}
