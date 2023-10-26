import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { AppStoreService } from 'src/services/app-store.service';
import { DataInitService } from 'src/services/data-init.service';
import { ButtonData } from 'src/shared/shared-types';

const RANGE_MAX = 15;
const RANGE_MIN = 1;

@Injectable({
  providedIn: 'root',
})
export class AppLogicService {
  constructor(
    private dataInit: DataInitService,
    private store: AppStoreService
  ) {
    this.store.buttons$.subscribe((buttons) => {
      this.refreshNSolved(buttons);
    });
    this.store.nMax$.subscribe(() => {
      this.refreshQuizData();
    });
    this.refreshQuizData();
  }

  refreshQuizData() {
    this.dataInit.refreshQuizData();
  }

  increment() {
    let state = this.store.state();
    let nMax = state.nMax + 1;
    if (nMax > RANGE_MAX) {
      return;
    }
    this.store.patchState({ nMax });
  }

  decrement() {
    let state = this.store.state();
    let nMax = state.nMax - 1;
    if (nMax < RANGE_MIN) {
      return;
    }
    this.store.patchState({ nMax });
  }

  selectItem(newIndex: number) {
    let state = this.store.state();
    let buttons = cloneDeep(state.buttons);

    let selectedName = '';
    if (state.selectedIndex != null) {
      selectedName = buttons[state.selectedIndex].label;
    }
    let newName = buttons[newIndex].label;

    // reset buttons that are not done
    for (let button of buttons) {
      if (button.state != 'done') {
        button.state = '';
      }
    }

    // only one selected
    if (state.selectedIndex == null) {
      this.store.patchState({ selectedIndex: newIndex });
      buttons[newIndex].state = 'selected';
    } else if (state.selectedIndex == newIndex) {
      // same button clicked again
      this.store.patchState({ selectedIndex: null });
    } else if (state.correctResultMapping[selectedName] == newName) {
      // correct pair selected
      buttons[newIndex].state = 'done';
      buttons[state.selectedIndex].state = 'done';
      this.store.patchState({ selectedIndex: null });
    } else {
      // incorrect pair selected
      buttons[newIndex].state = 'red';
      buttons[state.selectedIndex].state = 'red';
      this.store.patchState({ selectedIndex: null });
    }
    console.log('this runs but doesnt trigger buttons$ observer');
    this.store.patchState({ buttons: buttons });
  }

  refreshNSolved(buttons: ButtonData[]) {
    let nSolved = 0;
    for (let button of buttons) {
      if (button.state == 'done') {
        nSolved++;
      }
    }
    nSolved = nSolved / 2;
    this.store.patchState({ nSolved });
  }
}
