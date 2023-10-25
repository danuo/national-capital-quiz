import { Component, OnInit } from '@angular/core';

import { AppLogicService } from 'src/app/app-logic.service';
import { DataInitService } from 'src/services/data-init.service';
import { ButtonData, StringObject } from 'src/shared/shared-types';
import { AppStoreService } from 'src/shared/store';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css'],
})
export class ButtonListComponent implements OnInit {
  buttons: ButtonData[] = [];
  correctResultMapping: StringObject = {};
  nTotal: number = 10;
  nSolved: number = 0;
  selectedIndex: number | null = null;

  nSolved$ = this.store.nSolved$;

  constructor(
    private appLogic: AppLogicService,
    private dataInit: DataInitService,
    private store: AppStoreService
  ) {}

  ngOnInit() {
    let state = this.store.state();
    this.nSolved = state.nSolved;
    this.nTotal = state.nTotal;
    this.correctResultMapping = state.correctResultMapping;
    this.buttons = state.buttons;
  }

  onClick(newIndex: number) {
    this.appLogic.selectItem(newIndex);
  }
}
