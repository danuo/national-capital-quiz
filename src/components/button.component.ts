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
import { AppStoreService } from 'src/services/app-store.service';

const componentTemplate = `
<p-button
  [label]="label"
  class="flex align-items-center justify-content-center m-2"
  (click)="onClick()"
  [@buttonAnimation]="state == 'done' ? 'done' : 'normal'"
  [outlined]="outlined"
  [severity]="severity"
  [disabled]="state == 'done'"
>
</p-button>
`;

@Component({
  selector: 'app-button',
  template: componentTemplate,
  styles: [],
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

  constructor(private store: AppStoreService) {}

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
    this.store.selectItem(this.id);
  }
}
