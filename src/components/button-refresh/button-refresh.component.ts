import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

const componentTemplate = `
<p-button
  label="refresh"
  class="m-2"
  severity="help"
  [outlined]="false"
  (click)="refresh()"
>
</p-button>
`;

@Component({
  selector: 'app-button-refresh',
  template: componentTemplate,
  styles: [],
})
export class ButtonRefreshComponent {
  constructor(private store: AppStoreService) {}

  refresh() {
    this.store.refreshQuizData();
  }
}
