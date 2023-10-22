import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css'],
})
export class ButtonListComponent implements OnInit {
  buttons: any[] = [];

  ngOnInit() {
    this.generateButtons();
  }

  generateButtons() {
    for (let i = 1; i <= 20; i++) {
      let buttonData = {
        label: 'button: ' + i,
        id: i,
        isActive: true,
      };
      this.buttons.push(buttonData);
    }
  }

  trackByItem(index: number, item: any): number {
    return item.id;
  }
}
