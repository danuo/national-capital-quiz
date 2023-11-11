import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

@Component({
  selector: 'app-refresh-button',
  template: `
    <p-button
      label="refresh"
      severity="help"
      [outlined]="false"
      (click)="refresh()"
    >
    </p-button>
  `,
  styles: [],
})
export class RefreshButtonComponent {
  constructor(private store: AppStoreService) {}

  refresh() {
    this.store.restQuiz();
  }
}
