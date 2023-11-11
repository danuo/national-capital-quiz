import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, combineLatestWith, map } from 'rxjs';
import { DataInitService } from 'src/services/data-init.service';
import {
  ButtonData,
  ButtonStates,
  StringObject,
} from 'src/shared/shared-types';

import { cloneDeep, sum } from 'lodash';

export interface MyState {
  buttonLabels: string[];
  buttonIsDone: boolean[];
  correctResultMapping: StringObject;
  nMax: number;
  selectedIndices: number[];
  sessionId: number;
}

const RANGE_MAX = 15;
const RANGE_MIN = 1;

@Injectable({ providedIn: 'root' })
export class AppStoreService extends ComponentStore<MyState> {
  private readonly buttonLabels$: Observable<string[]> = this.select(
    (state) => state.buttonLabels
  );

  private readonly buttonIsDone$: Observable<boolean[]> = this.select(
    (state) => state.buttonIsDone
  );

  private readonly correctResultMapping$: Observable<StringObject> =
    this.select((state) => state.correctResultMapping);

  private readonly nMax$: Observable<number> = this.select(
    (state) => state.nMax
  );

  private readonly selectedIndices$: Observable<number[]> = this.select(
    (state) => state.selectedIndices
  );

  private readonly sessionId$: Observable<number> = this.select(
    (state) => state.sessionId
  );

  readonly nTotal$: Observable<number> = this.correctResultMapping$.pipe(
    map((list: StringObject) => Object.keys(list).length / 2)
  );

  readonly nSolved$: Observable<number> = this.buttonIsDone$.pipe(
    map((buttonDoneStates: boolean[]) => sum(buttonDoneStates) / 2)
  );

  readonly quizIsDone$: Observable<boolean> = this.nSolved$.pipe(
    combineLatestWith(this.nTotal$),
    map(([nTotal, nSolved]) => {
      return nTotal == nSolved;
    })
  );

  readonly buttons: Observable<ButtonData[]> = this.selectedIndices$.pipe(
    combineLatestWith(this.buttonLabels$, this.buttonIsDone$, this.sessionId$),
    map(([selectedIndices, labels, dones, sessionId]) => {
      return labels.map((label, index) => {
        let done = dones[index];
        let state = ButtonStates.Default;
        if (done) {
          state = ButtonStates.Done;
        } else {
          if (selectedIndices.includes(index)) {
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

  constructor(private dataInit: DataInitService) {
    super({
      buttonLabels: [],
      buttonIsDone: [],
      correctResultMapping: {},
      nMax: 10,
      selectedIndices: [],
      sessionId: 0,
    });

    this.nMax$.subscribe(() => {
      this.restQuiz();
    });
    this.restQuiz();
  }

  restQuiz() {
    let state = this.state();
    let sessionId = (state.sessionId + 1) % 2;
    let newQuizData = this.dataInit.getRandomQuizData(this.state().nMax);
    let buttonsDone = newQuizData.shuffledButtonLabels.map(() => {
      return false;
    });

    this.patchState({
      buttonLabels: newQuizData.shuffledButtonLabels,
      buttonIsDone: buttonsDone,
      correctResultMapping: newQuizData.correctResultMapping,
      sessionId,
      selectedIndices: [],
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
    console.log(newIndex);
    let state = this.state();

    if (state.selectedIndices.length == 0) {
      // 0 items selected -> set new index
      this.patchState({ selectedIndices: [newIndex] });
      return;
    }

    if (state.selectedIndices.length == 2) {
      // 2 items selected (incorrect pair) -> set new index
      this.patchState({ selectedIndices: [newIndex] });
      return;
    }

    // state.selectedIndices.length == 1
    // 1 items selected

    if (state.selectedIndices[0] == newIndex) {
      // selected and clicked is the same item -> deselect
      this.patchState({ selectedIndices: [] });
      return;
    }

    let selectedName = state.buttonLabels[state.selectedIndices[0]];
    let newName = state.buttonLabels[newIndex];

    if (state.correctResultMapping[selectedName] == newName) {
      // correct pair
      let buttonsDone = cloneDeep(state.buttonIsDone);
      buttonsDone[state.selectedIndices[0]] = true;
      buttonsDone[newIndex] = true;
      this.patchState({ buttonIsDone: buttonsDone, selectedIndices: [] });
      return;
    } else {
      // incorrect pair
      this.patchState({
        selectedIndices: [state.selectedIndices[0], newIndex],
      });
      return;
    }
  }
}
