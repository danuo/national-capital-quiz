import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ButtonData, StringObject } from 'src/shared/shared-types';

export interface MyState {
  buttons: ButtonData[];
  correctResultMapping: StringObject;
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
      nTotal: 10,
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
  readonly nTotal$: Observable<number> = this.select((state) => state.nTotal);
  readonly nSolved$: Observable<number> = this.select((state) => state.nSolved);
  readonly selectedIndex$: Observable<number | null> = this.select(
    (state) => state.selectedIndex
  );

  // read state
  // readonly status$: Observable<number> = this.select((state) => state.status);
}
