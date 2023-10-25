import { Injectable, OnInit } from '@angular/core';
import { AppStoreService } from 'src/shared/store';

@Injectable({
  providedIn: 'root',
})
export class AppLogicService implements OnInit {
  // buttons$ = this.store.buttons$;
  // correctResultMapping$ = this.store.correctResultMapping$;
  nTotal$ = this.store.nTotal$;
  // nSolved$ = this.store.nSolved$;
  // selectedIndex$ = this.store.selectedIndex$;

  constructor(private store: AppStoreService) {
    console.log('AAA');
    console.log(this.store.state());
  }

  ngOnInit(): void {
    // this is never called
    console.log('BBB');
  }

  reload(): void {
    // ! test function
    console.log(this.store.state());
    console.log(this.nTotal$);
    console.log(
      this.nTotal$.subscribe({
        next(x) {
          console.log(x);
        },
      })
    );
  }

  selectButton(newIndex: number) {
    let state = this.store.state();

    let selectedName = '';
    if (state.selectedIndex != null) {
      selectedName = state.buttons[state.selectedIndex].label;
    }
    let newName = state.buttons[newIndex].label;

    // reset buttons that are not done
    for (let button of state.buttons) {
      if (button.state != 'done') {
        button.state = '';
      }
    }

    // only one selected
    if (state.selectedIndex == null) {
      // state.selectedIndex = newIndex;
      this.store.patchState({ selectedIndex: newIndex });
      state.buttons[newIndex].state = 'selected';
    } else if (state.selectedIndex == newIndex) {
      // same button clicked again
      // state.selectedIndex = null; // todo
      this.store.patchState({ selectedIndex: null });
    } else if (state.correctResultMapping[selectedName] == newName) {
      // correct pair selected
      state.buttons[newIndex].state = 'done';
      state.buttons[state.selectedIndex].state = 'done';
      // state.selectedIndex = null; // todo
      this.store.patchState({ selectedIndex: null });
    } else {
      // incorrect pair selected
      state.buttons[newIndex].state = 'red';
      state.buttons[state.selectedIndex].state = 'red';
      // state.selectedIndex = null; // todo
      this.store.patchState({ selectedIndex: null });
    }
    this.store.patchState({ buttons: state.buttons });
    let nSolved = this.getNSolved();
    this.store.patchState({ nSolved });
  }

  getNSolved(): number {
    let state = this.store.state();
    let nSolved = 0;
    for (let button of state.buttons) {
      if (button.state == 'done') {
        nSolved++;
      }
    }
    nSolved = nSolved / 2;
    return nSolved;
  }
}
