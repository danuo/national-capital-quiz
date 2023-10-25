import { Injectable } from '@angular/core';
import { invert, pick, shuffle, take } from 'lodash';
import { StringObject, countryData } from 'src/shared/shared-types';
import { AppStoreService } from 'src/shared/store';

@Injectable({
  providedIn: 'root',
})
export class DataInitService {
  data: StringObject;
  constructor(private store: AppStoreService) {
    this.data = countryData;
  }

  refreshQuizData() {
    let state = this.store.state();
    // select {{nTotal}} country/city pairs
    let dataSelection: StringObject = {};
    if (Object.keys(this.data).length > state.nMax) {
      const shuffledKeys = shuffle(Object.keys(this.data));
      const randomSubsetKeys = take(shuffledKeys, state.nTotal);
      dataSelection = pick(this.data, randomSubsetKeys);
    } else {
      dataSelection = this.data;
    }

    let nTotal = Object.keys(dataSelection).length;

    // create mapping for correct result
    const dataInv = invert(dataSelection);
    let correctResultMapping = { ...dataSelection, ...dataInv };

    // create data for the buttons
    const allButtonLabels = [
      ...Object.keys(dataSelection),
      ...Object.values(dataSelection),
    ];
    const shuffledButtonLabels = shuffle(allButtonLabels);

    let buttons = shuffledButtonLabels.map((item, index) => {
      return {
        label: item,
        id: index, // todo: remove
        state: '',
      };
    });

    this.store.patchState({ nTotal });
    this.store.patchState({ correctResultMapping });
    this.store.patchState({ buttons });
  }
}
