import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, combineLatestWith, map } from 'rxjs';
import { ButtonData, StringObject } from 'src/shared/shared-types';

export interface MyState {
  buttons: ButtonData[];
  correctResultMapping: StringObject;
  nMax: number;
  nTotal: number;
  nSolved: number;
  selectedIndex: number | null;
}

@Injectable({ providedIn: 'root' })
export class AppStoreService extends ComponentStore<MyState> {
  // init state in constructor
  constructor() {
    super({
      buttons: [],
      correctResultMapping: {},
      nMax: 10,
      nTotal: 0,
      nSolved: 0,
      selectedIndex: null,
    });
  }

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
    map(([v1, v2]) => {
      return v1 == v2;
    })
  );
}
