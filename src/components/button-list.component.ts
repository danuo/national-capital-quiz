import { Component } from '@angular/core';

import { AppStoreService } from 'src/services/app-store.service';

const componentTemplate = `
<div class="flex flex-wrap m-3">
  <ng-container
    *ngFor="let button of buttons$ | async; index as i; trackBy: trackByItem"
  >
    <app-button [label]="button.label" [state]="button.state" [id]="i">
    </app-button>
  </ng-container>
</div>
`;

@Component({
  selector: 'app-button-list',
  template: componentTemplate,
  styles: [],
})
export class ButtonListComponent {
  buttons$ = this.store.buttons$;
  isDone$ = this.store.isDone$;

  constructor(private store: AppStoreService) {}

  trackByItem(index: number, item: any): string {
    return item.label + String(item.sessionId);
  }
}
