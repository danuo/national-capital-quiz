import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css'],
})
export class ButtonListComponent implements OnInit {
  buttons: Map<number, any> = new Map();

  ngOnInit() {
    this.generateButtons();
  }

  generateButtons() {
    for (let i = 1; i <= 20; i++) {
      this.buttons.set(i, 'Button ' + i);
    }
  }

  removeItem(index: number) {
    console.log(this.buttons);
    this.buttons.delete(index);
  }
}
