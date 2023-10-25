import { Component } from '@angular/core';
import { AppStoreService } from 'src/shared/store';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-button-confetti',
  templateUrl: './button-confetti.component.html',
  styleUrls: ['./button-confetti.component.css'],
})
export class ButtonConfettiComponent {
  private window: any = null;

  constructor(
    private store: AppStoreService,
    private windowService: WindowService
  ) {
    this.window = this.windowService.nativeWindow;
    this.store.isDone$.subscribe((x) => {
      this.window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  onClick() {
    this.windowService.nativeWindow.confetti({
      angle: this.randomInRange(55, 125),
      spread: this.randomInRange(50, 70),
      particleCount: this.randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  }
}
