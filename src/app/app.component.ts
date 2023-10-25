import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppStoreService } from 'src/shared/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isDone$ = this.store.isDone$;

  constructor(
    private store: AppStoreService,
    private primengConfig: PrimeNGConfig
  ) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
