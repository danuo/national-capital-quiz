import { Component } from '@angular/core';
import { AppLogicService } from 'src/app/app-logic.service';

@Component({
  selector: 'app-button-refresh',
  templateUrl: './button-refresh.component.html',
  styleUrls: ['./button-refresh.component.css'],
})
export class ButtonRefreshComponent {
  constructor(private appLogic: AppLogicService) {}

  refresh() {
    this.appLogic.refreshQuizData();
  }
}
