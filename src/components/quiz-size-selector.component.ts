import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

const componentTemplate = `
<div class="flex w-full flex-wrap justify-content-center align-items-center">
  <p-button
    icon="pi pi-minus"
    [outlined]="true"
    (click)="decrement()"
  ></p-button>
  <div class="relative">
    <div
      class="absolute h-full w-full flex align-items-center pl-2"
    >
    <app-quiz-progress></app-quiz-progress>
    </div>
    <div ngClass="text-xl p-2" [ngStyle]="{ 'visibility': 'hidden' }">
      Solved 10/10
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
