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
      this.buttons.push({ label: 'Button ' + i, id: i });
    }
    console.log(this.buttons);
  }
}
