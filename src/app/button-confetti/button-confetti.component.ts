import { Component } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'app-button-confetti',
  templateUrl: './button-confetti.component.html',
  styleUrls: ['./button-confetti.component.css'],
})
export class ButtonConfettiComponent {
  window: any = null;

  constructor(private windowService: WindowService) {
    this.window = this.windowService.nativeWindow;
  }

  randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  onClick() {
    this.window.confetti({
      angle: this.randomInRange(55, 125),
      spread: this.randomInRange(50, 70),
      particleCount: this.randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  }
}
