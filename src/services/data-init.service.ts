import { Injectable } from '@angular/core';
import { invert, pick, shuffle, take } from 'lodash';
import { StringObject, countryData } from 'src/shared/shared-types';

@Injectable({
  providedIn: 'root',
})
export class DataInitService {
  data: StringObject;
  constructor() {
    this.data = countryData;
  }

  getRandomQuizData(nMax: number) {
    // select nMax country/city pairs
    let dataSelection: StringObject = {};
    if (Object.keys(this.data).length > nMax) {
      const shuffledKeys = shuffle(Object.keys(this.data));
      const randomSubsetKeys = take(shuffledKeys, nMax);
      dataSelection = pick(this.data, randomSubsetKeys);
    } else {
      dataSelection = this.data;
    }

    // create mapping for correct result
    const dataInv = invert(dataSelection);

    // create data for the buttons
    const allButtonLabels = [
      ...Object.keys(dataSelection),
      ...Object.values(dataSelection),
    ];
    const shuffledButtonLabels = shuffle(allButtonLabels);

    let correctResultMapping = { ...dataSelection, ...dataInv };
    return { shuffledButtonLabels, correctResultMapping };
  }
}
