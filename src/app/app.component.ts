import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { StringObject } from 'src/shared/shared-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular';

  data: StringObject = {
    Germany: 'Berlin',
    Azerbaijan: 'Baku',
  };

  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
