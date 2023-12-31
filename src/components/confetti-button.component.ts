import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';
import { WindowService } from 'src/services/window.service';

@Component({
  selector: 'app-confetti-button',
  template: `
    <p-button
      icon="pi pi-heart"
      [rounded]="true"
      severity="help"
      [outlined]="true"
      (click)="onClick()"
      [raised]="true"
      size="large"
    ></p-button>
  `,
  styles: [],
})
export class ConfettiButtonComponent {
  previousIsDone: boolean = false;

  constructor(
    private store: AppStoreService,
    private windowService: WindowService
  ) {
    this.store.quizIsDone$.subscribe((isDone) => {
      if (this.previousIsDone == false && isDone == true) {
        this.windowService.window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      this.previousIsDone = isDone;
    });
  }

  randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  onClick() {
    this.windowService.window.confetti({
      angle: this.randomInRange(55, 125),
      spread: this.randomInRange(50, 70),
      particleCount: this.randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  }
}
