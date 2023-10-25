import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
      state('done', style({ opacity: 0, transform: 'translateY(500%)' })),
      transition(
        '* => done',
        animate(
          '1000ms ease-out',
          style({ opacity: 0, transform: 'translateY(500%)' })
        )
      ),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-out',
          style({ opacity: 0, transform: 'translateY(100%)' })
        ),
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
      this.severity = 'danger';
    } else {
      this.severity = '';
    }
  }

  onClick() {
    this.parent.onClick(this.id);
  }
}
