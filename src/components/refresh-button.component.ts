import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

const componentTemplate = `
<p-button
  label="refresh"
  severity="help"
  [outlined]="false"
  (click)="refresh()"
>
</p-button>
`;

@Component({
  selector: 'app-refresh-button',
  template: componentTemplate,
  styles: [],
})
export class RefreshButtonComponent {
  constructor(private store: AppStoreService) {}

  refresh() {
    this.store.restQuiz();
  }
}
