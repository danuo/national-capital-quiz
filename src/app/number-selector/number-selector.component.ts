import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';
import { AppLogicService } from '../app-logic.service';

@Component({
  selector: 'app-number-selector',
  templateUrl: './number-selector.component.html',
  styleUrls: ['./number-selector.component.css'],
})
export class NumberSelectorComponent {
  nMax: number = 10;

  constructor(
    private store: AppStoreService,
    private appLogic: AppLogicService
  ) {}

  onClick() {
    this.store.patchState({ nMax: this.nMax });
    this.appLogic.refreshQuizData();
  }
}
