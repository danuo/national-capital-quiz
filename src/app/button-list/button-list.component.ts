import { Component, Input, OnInit } from '@angular/core';

import { invert, pick, shuffle, take } from 'lodash';
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

  nTotal: number = 10;
  nSolved: number = 0;

  selectedIndex: number | null = null;

  ngOnInit() {
    this.nSolved = 0;

    // select 10 country/city pairs
    let dataSelection: StringObject = {};
    if (Object.keys(this.data).length > this.nTotal) {
      const shuffledKeys = shuffle(Object.keys(this.data));
      const randomSubsetKeys = take(shuffledKeys, this.nTotal);
      dataSelection = pick(this.data, randomSubsetKeys);
    } else {
      dataSelection = this.data;
    }
    this.nTotal = Object.keys(dataSelection).length;

    // create mapping for correct result
    const dataInv = invert(dataSelection);
    this.correctResultMapping = { ...dataSelection, ...dataInv };

    // create data for the buttons
    const allButtonLabels = [
      ...Object.keys(dataSelection),
      ...Object.values(dataSelection),
    ];
    const shuffledButtonLabels = shuffle(allButtonLabels);
    this.buttons = shuffledButtonLabels.map((item, index) => {
      return {
        label: item,
        id: index,
        state: '',
      };
    });
  }

  handleClick(newIndex: number) {
    // reset buttons that are not done
    for (let button of this.buttons) {
      if (button.state != 'done') {
        button.state = '';
      }
    }

    // only one selected
    if (this.selectedIndex == null) {
      this.selectedIndex = newIndex;
      this.buttons[newIndex].state = 'selected';
      console.log(this.buttons);
      return;
    }

    // same button clicked again
    if (this.selectedIndex == newIndex) {
      this.selectedIndex = null;
      return;
    }

    let selectedName = this.buttons[this.selectedIndex].label;
    let newName = this.buttons[newIndex].label;

    if (this.correctResultMapping[selectedName] == newName) {
      // correct pair selected
      this.buttons[newIndex].state = 'done';
      this.buttons[this.selectedIndex].state = 'done';
      this.selectedIndex = null;

      this.nSolved = this.getNSolved();
      return;
    } else {
      // incorrect pair selected
      this.buttons[newIndex].state = 'red';
      this.buttons[this.selectedIndex].state = 'red';
      this.selectedIndex = null;
      return;
    }
  }

  getNSolved() {
    let nSolved = 0;
    for (let button of this.buttons) {
      if (button.state == 'done') {
        nSolved++;
      }
    }
    nSolved = nSolved / 2;
    console.log(nSolved);
    return nSolved;
  }

  trackByItem(index: number, item: any): number {
    return item.id;
  }
}
