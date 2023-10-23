import { Component, Input, OnInit } from '@angular/core';

import { invert, shuffle } from 'lodash';
import { ButtonData, StringObject } from 'src/shared/shared-types';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css'],
})
export class ButtonListComponent implements OnInit {
  @Input() data!: StringObject;

  buttons: ButtonData[] = [];
  correctResultMapping: StringObject = {};

  selectedIndex: number | null = null;

  ngOnInit() {
    const dataInv = invert(this.data);
    this.correctResultMapping = { ...this.data, ...dataInv };
    const allButtonLabels = [
      ...Object.keys(this.data),
      ...Object.values(this.data),
    ];
    const shuffledButtonLabels = shuffle(allButtonLabels);

    this.buttons = shuffledButtonLabels.map((item, index) => {
      return {
        label: item,
        id: index,
        isActive: true,
        state: 'selected',
      };
    });
  }

  handleClick(newIndex: number) {
    console.log('heeere');
    if (this.selectedIndex == null) {
      this.selectedIndex = newIndex;
      // all states to "dark"
      this.buttons[newIndex].state = 'selected';
      console.log(this.buttons);
      return;
    }

    if (this.selectedIndex == newIndex) {
      this.selectedIndex = null;
      // all states to "dark"
      return;
    }

    let selectedName = this.buttons[this.selectedIndex].label;
    let newName = this.buttons[newIndex].label;

    if (this.correctResultMapping[selectedName] == newName) {
      this.buttons[newIndex].state = 'done';
      this.buttons[this.selectedIndex].state = 'done';
      this.selectedIndex = null;
      return;
    } else {
      this.buttons[newIndex].state = 'red';
      this.buttons[this.selectedIndex].state = 'red';
      this.selectedIndex = null;
      return;
    }
  }

  trackByItem(index: number, item: any): number {
    return item.id;
  }
}
