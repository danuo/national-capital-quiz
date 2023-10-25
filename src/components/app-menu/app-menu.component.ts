import { Component } from '@angular/core';
import { AppLogicService } from 'src/app/app-logic.service';
import { AppStoreService } from 'src/shared/store';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css'],
})
export class AppMenuComponent {
  nSolved$ = this.store.nSolved$;
  nTotal$ = this.store.nTotal$;

  constructor(
    private appLogic: AppLogicService,
    private store: AppStoreService
  ) {}

  refresh() {
    this.appLogic.refreshQuizData();
  }
}
