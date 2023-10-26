import { Component } from '@angular/core';

import { AppStoreService } from 'src/services/app-store.service';
import { ButtonData } from 'src/shared/shared-types';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css'],
})
export class ButtonListComponent {
  buttons$ = this.store.buttons$;
  isDone$ = this.store.isDone$;

  constructor(private store: AppStoreService) {}

  trackByItem(index: number, item: ButtonData): string {
    return item.label + String(index);
  }
}
