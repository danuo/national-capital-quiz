import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

@Component({
  selector: 'app-quiz-size-selector',
  templateUrl: './quiz-size-selector.component.html',
  styles: [],
})
export class QuizSizeSelector {
  nMax: number = 10;

  constructor(private store: AppStoreService) {}

  increment() {
    this.store.increment();
  }

  decrement() {
    this.store.decrement();
  }
}
