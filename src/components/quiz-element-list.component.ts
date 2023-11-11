import { Component } from '@angular/core';

import { AppStoreService } from 'src/services/app-store.service';
import { ButtonData } from 'src/shared/shared-types';

@Component({
  selector: 'app-quiz-element-list',
  templateUrl: './quiz-element-list.component.html',
  styles: [],
})
export class QuizElementListComponent {
  buttonsNew$ = this.store.buttons;
  isDone$ = this.store.quizIsDone$;

  constructor(private store: AppStoreService) {}

  trackByItem(index: number, item: ButtonData): string {
    return item.label + String(item.sessionId);
  }
}
