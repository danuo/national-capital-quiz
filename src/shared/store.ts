import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface MyState {
  status: number;
}

@Injectable()
export class MyStore extends ComponentStore<MyState> {
  // read state
  readonly status$: Observable<number> = this.select((state) => state.status);
}
