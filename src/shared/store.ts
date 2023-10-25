import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
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

  // read state
  // readonly status$: Observable<number> = this.select((state) => state.status);
}
