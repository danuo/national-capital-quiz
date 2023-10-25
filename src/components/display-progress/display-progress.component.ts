import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';
@Component({
  selector: 'app-display-progress',
  templateUrl: './display-progress.component.html',
  styleUrls: ['./display-progress.component.css'],
})
export class DisplayProgressComponent {
  nSolved$ = this.store.nSolved$;
  nTotal$ = this.store.nTotal$;

  constructor(private store: AppStoreService) {}
}
