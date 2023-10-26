import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

@Component({
  selector: 'app-number-selector',
  templateUrl: './number-selector.component.html',
  styleUrls: ['./number-selector.component.css'],
})
export class NumberSelectorComponent {
  nMax: number = 10;

  constructor(private store: AppStoreService) {}

  increment() {
    this.store.increment();
  }

  decrement() {
    this.store.decrement();
  }
}
