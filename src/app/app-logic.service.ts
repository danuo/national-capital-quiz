import { Injectable, OnInit } from '@angular/core';
import { AppStoreService } from 'src/shared/store';

@Injectable({
  providedIn: 'root',
})
export class AppLogicService implements OnInit {
  buttons$ = this.store.buttons$;
  correctResultMapping$ = this.store.correctResultMapping$;
  nTotal$ = this.store.nTotal$;
  nSolved$ = this.store.nSolved$;
  selectedIndex$ = this.store.selectedIndex$;

  constructor(private store: AppStoreService) {}

  ngOnInit(): void {}

  reload(): void {
    this.store.setState();
  }

  selectButton(newIndex: number) {
    // reset buttons that are not done
    for (let button of this.buttons) {
      if (button.state != 'done') {
        button.state = '';
      }
    }

    // only one selected
    if (this.selectedIndex$ == null) {
      this.selectedIndex$ = newIndex;
      this.buttons$[newIndex].state = 'selected';
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
