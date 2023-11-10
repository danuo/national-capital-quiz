import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

const componentTemplate = `
<span class="text-xl">Solved {{ nSolved$ | async }}/{{ nTotal$ | async }}</span>
`;

@Component({
  selector: 'app-quiz-progress',
  template: componentTemplate,
  styles: [],
})
export class QuizProgressComponent {
  nSolved$ = this.store.nSolved$;
  nTotal$ = this.store.nTotal$;

  constructor(private store: AppStoreService) {}
}
