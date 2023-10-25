import { Component } from '@angular/core';

import { AppStoreService } from 'src/shared/store';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css'],
})
export class ButtonListComponent {
  nSolved$ = this.store.nSolved$;
  buttons$ = this.store.buttons$;

  constructor(private store: AppStoreService) {}
}
