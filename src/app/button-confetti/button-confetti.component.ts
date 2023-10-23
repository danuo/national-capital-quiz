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
}
