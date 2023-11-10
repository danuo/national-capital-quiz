import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

const componentTemplate = `
<div class="flex w-full flex-wrap justify-content-center align-items-center">
  <p-button
    icon="pi pi-minus"
    [outlined]="true"
    (click)="decrement()"
  ></p-button>
  <div class="relative" style="width: 4rem">
    <div
      class="absolute h-full w-full flex justify-content-center align-items-center"
    >
      <i class="pi pi-sort-alt" style="font-size: 1.1rem"></i>
    </div>
  </div>
  <p-button
    icon="pi pi-plus"
    [outlined]="true"
    (click)="increment()"
  ></p-button>
</div>
`;

@Component({
  selector: 'app-quiz-size-selector',
  template: componentTemplate,
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
