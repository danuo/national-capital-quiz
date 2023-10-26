import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

@Component({
  selector: 'app-button-refresh',
  templateUrl: './button-refresh.component.html',
  styleUrls: ['./button-refresh.component.css'],
})
export class ButtonRefreshComponent {
  constructor(private store: AppStoreService) {}

  refresh() {
    this.store.refreshQuizData();
  }
}
