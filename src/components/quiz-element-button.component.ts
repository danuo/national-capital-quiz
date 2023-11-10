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
import { ButtonStates } from 'src/shared/shared-types';

const componentTemplate = `
<p-button
  [label]="label"
  class="flex"
  (click)="onClick()"
  [@buttonAnimation]="state == ButtonStates.Done ? 'done' : 'normal'"
  [outlined]="outlined"
  [severity]="severity"
  [disabled]="state == ButtonStates.Done"
>
</p-button>
`;

@Component({
  selector: 'app-quiz-element-button',
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
export class QuizElementButtonComponent implements OnInit, OnChanges {
  ButtonStates = ButtonStates;
  @Input() label!: string;
  @Input() id!: number;
  @Input() state!: ButtonStates;

  constructor(private store: AppStoreService) {}

  outlined = true;
  severity = '';

  ngOnInit(): void {
    this.updateStyling();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateStyling();
  }

  updateStyling(): void {
    // outlined
    this.outlined = this.state != ButtonStates.Selected;

    // severity
    if (this.state == ButtonStates.Red) {
      this.severity = 'danger';
    } else {
      this.severity = '';
    }
  }

  onClick() {
    this.store.selectItem(this.id);
  }
}
