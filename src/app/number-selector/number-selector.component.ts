import { Component } from '@angular/core';
import { AppLogicService } from '../app-logic.service';

@Component({
  selector: 'app-number-selector',
  templateUrl: './number-selector.component.html',
  styleUrls: ['./number-selector.component.css'],
})
export class NumberSelectorComponent {
  nMax: number = 10;

  constructor(private appLogic: AppLogicService) {}

  increment() {
    console.log('increem');
    this.appLogic.increment();
  }

  decrement() {
    this.appLogic.decrement();
  }
}
