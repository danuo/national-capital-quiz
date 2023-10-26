import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, combineLatestWith, map } from 'rxjs';
import { DataInitService } from 'src/services/data-init.service';
import { ButtonData, StringObject } from 'src/shared/shared-types';

import { cloneDeep } from 'lodash';

export interface MyState {
  buttons: ButtonData[];
  correctResultMapping: StringObject;
  nMax: number;
  nTotal: number;
  nSolved: number;
  selectedIndex: number | null;
}

const RANGE_MAX = 15;
const RANGE_MIN = 1;

@Injectable({ providedIn: 'root' })
export class AppStoreService extends ComponentStore<MyState> {
  readonly buttons$: Observable<ButtonData[]> = this.select(
    (state) => state.buttons
  );
  readonly correctResultMapping$: Observable<StringObject> = this.select(
    (state) => state.correctResultMapping
  );
  readonly nMax$: Observable<number> = this.select((state) => state.nMax);
  readonly nTotal$: Observable<number> = this.select((state) => state.nTotal);
  readonly nSolved$: Observable<number> = this.select((state) => state.nSolved);
  readonly selectedIndex$: Observable<number | null> = this.select(
    (state) => state.selectedIndex
  );

  readonly isDone$ = this.nTotal$.pipe(
    combineLatestWith(this.nSolved$),
    map(([nTotal, nSolved]) => {
      return nTotal == nSolved;
    })
  );

  // sessionId for trackByItem to trigger animations (to get Berlin != Berlin after reload)
  sessionId: number = 0;

  constructor(private dataInit: DataInitService) {
    super({
      buttons: [],
      correctResultMapping: {},
      nMax: 10,
      nTotal: 0,
      nSolved: 0,
      selectedIndex: null,
    });

    this.buttons$.subscribe((buttons) => {
      this.refreshNSolved(buttons);
    });
    this.nMax$.subscribe(() => {
      this.refreshQuizData();
    });
    this.refreshQuizData();
  }

  refreshQuizData() {
    // togglet session Id for trackByItem
    this.sessionId = (this.sessionId + 1) % 2;
    let newQuizData = this.dataInit.getRandomQuizData(this.state().nMax);
    let nTotal = Object.keys(newQuizData.shuffledButtonLabels).length;
    let buttons = newQuizData.shuffledButtonLabels.map((item) => {
      return {
        label: item,
        state: '',
        sessionId: this.sessionId,
      };
    });

    this.patchState({
      buttons,
      correctResultMapping: newQuizData.correctResultMapping,
      nTotal,
    });
  }

  increment() {
    let state = this.state();
    let nMax = state.nMax + 1;
    if (nMax > RANGE_MAX) {
      return;
    }
    this.patchState({ nMax });
  }

  decrement() {
    let state = this.state();
    let nMax = state.nMax - 1;
    if (nMax < RANGE_MIN) {
      return;
    }
    this.patchState({ nMax });
  }

  selectItem(newIndex: number) {
    let state = this.state();
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
      this.patchState({ selectedIndex: newIndex });
      buttons[newIndex].state = 'selected';
    } else if (state.selectedIndex == newIndex) {
      // same button clicked again
      this.patchState({ selectedIndex: null });
    } else if (state.correctResultMapping[selectedName] == newName) {
      // correct pair selected
      buttons[newIndex].state = 'done';
      buttons[state.selectedIndex].state = 'done';
      this.patchState({ selectedIndex: null });
    } else {
      // incorrect pair selected
      buttons[newIndex].state = 'red';
      buttons[state.selectedIndex].state = 'red';
      this.patchState({ selectedIndex: null });
    }
    this.patchState({ buttons: buttons });
  }

  refreshNSolved(buttons: ButtonData[]) {
    let nSolved = 0;
    for (let button of buttons) {
      if (button.state == 'done') {
        nSolved++;
      }
    }
    nSolved = nSolved / 2;
    this.patchState({ nSolved });
  }
}
