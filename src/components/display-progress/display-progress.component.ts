import { Component } from '@angular/core';
import { AppStoreService } from 'src/services/app-store.service';

const componentTemplate = `
<span class="text-xl">Solved {{ nSolved$ | async }}/{{ nTotal$ | async }}</span>
`;

@Component({
  selector: 'app-display-progress',
  template: componentTemplate,
  styles: [],
})
export class DisplayProgressComponent {
  nSolved$ = this.store.nSolved$;
  nTotal$ = this.store.nTotal$;

  constructor(private store: AppStoreService) {}
}
