import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, combineLatestWith, map } from 'rxjs';
import { DataInitService } from 'src/services/data-init.service';
import {
  ButtonData,
  ButtonStates,
  StringObject,
} from 'src/shared/shared-types';

import { cloneDeep } from 'lodash';

export interface MyState {
  buttons: ButtonData[];
  buttonsLabels: string[];
  buttonsDone: boolean[];
  correctResultMapping: StringObject;
  nMax: number;
  nSolved: number;
  selectedIndex: number | null;
  selectedIndices: number[];
  sessionId: number;
}

const RANGE_MAX = 15;
const RANGE_MIN = 1;

enum QuizState {
  SELECTED_ZERO,
  ONE_SELECTED,
  TWO_SELECTED,
}

@Injectable({ providedIn: 'root' })
export class AppStoreService extends ComponentStore<MyState> {
  readonly buttons$: Observable<ButtonData[]> = this.select(
    (state) => state.buttons
  );
  readonly buttonsLabels$: Observable<string[]> = this.select(
    (state) => state.buttonsLabels
  );
  readonly buttonsDone$: Observable<boolean[]> = this.select(
    (state) => state.buttonsDone
  );
  readonly correctResultMapping$: Observable<StringObject> = this.select(
    (state) => state.correctResultMapping
  );
  readonly nMax$: Observable<number> = this.select((state) => state.nMax);
  readonly nSolved$: Observable<number> = this.select((state) => state.nSolved);
  readonly selectedIndex$: Observable<number | null> = this.select(
    (state) => state.selectedIndex
  );

  readonly selectedIndices$: Observable<number[]> = this.select(
    (state) => state.selectedIndices
  );

  readonly sessionId$: Observable<number> = this.select(
    (state) => state.sessionId
  );

  readonly nTotal$: Observable<number> = this.correctResultMapping$.pipe(
    map((list: StringObject) => Object.keys(list).length / 2)
  );

  readonly isDone$: Observable<boolean> = this.nTotal$.pipe(
    combineLatestWith(this.nSolved$),
    map(([nTotal, nSolved]) => {
      return nTotal == nSolved;
    })
  );

  readonly buttonsNew$: Observable<ButtonData[]> = this.selectedIndices$.pipe(
    combineLatestWith(this.buttonsLabels$, this.buttonsDone$, this.sessionId$),
    map(([selectedIndices, labels, dones, sessionId]) => {
      return labels.map((label, index) => {
        let state = ButtonStates.Default;
        let done = dones[index];
        if (done) {
          state = ButtonStates.Done;
        } else {
          if (index in selectedIndices) {
            if (selectedIndices.length == 1) {
              state = ButtonStates.Selected;
            } else if (selectedIndices.length == 2) {
              state = ButtonStates.Red;
            }
          }
        }
        let out: ButtonData = { state, label, sessionId };
        return out;
      });
    })
  );

  // sessionId for trackByItem to trigger animations (to get Berlin != Berlin after reload)

  constructor(private dataInit: DataInitService) {
    super({
      buttons: [],
      buttonsLabels: [],
      buttonsDone: [],
      correctResultMapping: {},
      nMax: 10,
      nSolved: 0,
      selectedIndex: null,
      selectedIndices: [],
      sessionId: 0,
    });

    this.buttons$.subscribe((buttons) => {
      // this.refreshNSolved(buttons);
    });

    this.nMax$.subscribe(() => {
      this.refreshQuizData();
    });
    this.refreshQuizData();
  }

  refreshQuizData() {
    // togglet session Id for trackByItem
    let state = this.state();
    let sessionId = (state.sessionId + 1) % 2;
    let newQuizData = this.dataInit.getRandomQuizData(this.state().nMax);
    let buttons = newQuizData.shuffledButtonLabels.map((item) => {
      return {
        label: item,
        state: '',
        sessionId: 0,
      };
    });
    let buttonsDone = newQuizData.shuffledButtonLabels.map((item) => {
      return false;
    });

    this.patchState({
      buttons,
      buttonsLabels: newQuizData.shuffledButtonLabels,
      buttonsDone,
      correctResultMapping: newQuizData.correctResultMapping,
      sessionId,
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

    // 0 items selected
    if (state.selectedIndices.length == 0) {
      this.patchState({ selectedIndices: [newIndex] });
      return;
    }

    // 2 items selected (incorrect pair)
    if (state.selectedIndices.length == 2) {
      this.patchState({ selectedIndices: [newIndex] });
      return;
    }

    // 1 items selected
    // state.selectedIndices.length == 1)

    if (state.selectedIndices[0] == newIndex) {
      // selected and clicked is the same
      this.patchState({ selectedIndices: [] });
      return;
    }

    let selectedName = state.buttonsLabels[state.selectedIndices[0]];
    let newName = state.buttonsLabels[newIndex];

    if (state.correctResultMapping[selectedName] == newName) {
      // correct pair
      let buttonsDone = cloneDeep(state.buttonsDone);
      buttonsDone[state.selectedIndices[0]] = true;
      buttonsDone[newIndex] = true;
      this.patchState({ buttonsDone, selectedIndices: [] });
      return;
    } else {
      // incorrect pair
      this.patchState({
        selectedIndices: [state.selectedIndices[0], newIndex],
      });
      return;
    }
  }

  // selectItemOld(newIndex: number) {
  //   let state = this.state();
  //   let buttons = cloneDeep(state.buttons);

  //   let selectedName = '';
  //   if (state.selectedIndex != null) {
  //     selectedName = buttons[state.selectedIndex].label;
  //   }
  //   let newName = buttons[newIndex].label;

  //   // reset buttons that are not done
  //   for (let button of buttons) {
  //     if (button.state != 'done') {
  //       button.state = '';
  //     }
  //   }

  //   // only one selected
  //   if (state.selectedIndex == null) {
  //     this.patchState({ selectedIndex: newIndex });
  //     buttons[newIndex].state = 'selected';
  //   } else if (state.selectedIndex == newIndex) {
  //     // same button clicked again
  //     this.patchState({ selectedIndex: null });
  //   } else if (state.correctResultMapping[selectedName] == newName) {
  //     // correct pair selected
  //     buttons[newIndex].state = 'done';
  //     buttons[state.selectedIndex].state = 'done';
  //     this.patchState({ selectedIndex: null });
  //   } else {
  //     // incorrect pair selected
  //     buttons[newIndex].state = 'red';
  //     buttons[state.selectedIndex].state = 'red';
  //     this.patchState({ selectedIndex: null });
  //   }
  //   this.patchState({ buttons: buttons });
  // }

  // refreshNSolved(buttons: ButtonData[]) {
  //   let nSolved = 0;
  //   for (let button of buttons) {
  //     if (button.state == 'done') {
  //       nSolved++;
  //     }
  //   }
  //   nSolved = nSolved / 2;
  //   this.patchState({ nSolved });
  // }
}
