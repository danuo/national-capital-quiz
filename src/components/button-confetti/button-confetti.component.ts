import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-button-confetti',
  templateUrl: './button-confetti.component.html',
  styleUrls: ['./button-confetti.component.css'],
})
export class ButtonConfettiComponent implements OnChanges {
  @Input() isCompleted!: boolean;
  window: any = null;

  constructor(private windowService: WindowService) {
    this.window = this.windowService.nativeWindow;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.window.scrollTo({ top: 0, behavior: 'smooth' });
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