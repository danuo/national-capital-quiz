import { Component } from '@angular/core';

import { AppStoreService } from 'src/services/app-store.service';
import { ButtonData } from 'src/shared/shared-types';

const componentTemplate = `
<div class="flex flex-wrap m-3 gap-2">
  <app-refresh-button></app-refresh-button>
  <ng-container
    *ngFor="let button of buttonsNew$ | async; index as i; trackBy: trackByItem"
  >
    <app-quiz-element-button [label]="button.label" [state]="button.state" [id]="i">
    </app-quiz-element-button>
  </ng-container>
</div>
`;

@Component({
  selector: 'app-quiz-element-list',
  template: componentTemplate,
  styles: [],
})
export class QuizElementListComponent {
  buttonsNew$ = this.store.buttons;
  isDone$ = this.store.isDone$;

  constructor(private store: AppStoreService) {}

  trackByItem(index: number, item: ButtonData): string {
    return item.label + String(item.sessionId);
  }
}
