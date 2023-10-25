import { Component, OnInit } from '@angular/core';

import { AppLogicService } from 'src/app/app-logic.service';
import { DataInitService } from 'src/services/data-init.service';
import { ButtonData, StringObject } from 'src/shared/shared-types';
import { AppStoreService } from 'src/shared/store';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css'],
})
export class ButtonListComponent implements OnInit {
  buttons: ButtonData[] = [];
  correctResultMapping: StringObject = {};
  nTotal: number = 10;
  nSolved: number = 0;
  selectedIndex: number | null = null;

  constructor(
    private appLogic: AppLogicService,
    private dataInit: DataInitService,
    private store: AppStoreService
  ) {}

  ngOnInit() {
    this.appLogic.reload();

    this.dataInit.refreshQuizData();
    let state = this.store.state();

    this.nSolved = state.nSolved;
    this.nTotal = state.nTotal;
    this.correctResultMapping = state.correctResultMapping;
    this.buttons = state.buttons;
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
    return nSolved;
  }
}
