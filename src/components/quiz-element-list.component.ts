import { Component } from '@angular/core';

import { AppStoreService } from 'src/services/app-store.service';

const componentTemplate = `
<div class="flex flex-wrap m-3">
  <ng-container
    *ngFor="let button of buttons$ | async; index as i; trackBy: trackByItem"
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
  buttons$ = this.store.buttons$;
  isDone$ = this.store.isDone$;

  constructor(private store: AppStoreService) {}

  trackByItem(index: number, item: any): string {
    return item.label + String(item.sessionId);
  }
}
