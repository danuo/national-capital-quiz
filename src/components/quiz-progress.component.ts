import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

@Component({
  selector: 'app-quiz-progress',
  template: `
    <span class="text-xl"
      >Solved {{ nSolved$ | async }}/{{ nTotal$ | async }}
    </span>
  `,
  styles: [],
})
export class QuizProgressComponent {
  nSolved$ = this.store.nSolved$;
  nTotal$ = this.store.nTotal$;

  constructor(private store: AppStoreService) {}
}
