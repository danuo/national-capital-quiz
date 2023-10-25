import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AppComponent } from 'src/app/app.component';
import { ButtonConfettiComponent } from 'src/components/button-confetti/button-confetti.component';
import { ButtonListComponent } from 'src/components/button-list/button-list.component';
import { ButtonComponent } from 'src/components/button/button.component';
import { AppStoreService } from 'src/services/app-store.service';
import { DataInitService } from 'src/services/data-init.service';
import { WindowService } from 'src/services/window.service';
import { ButtonRefreshComponent } from '../components/button-refresh/button-refresh.component';
import { DisplayProgressComponent } from '../components/display-progress/display-progress.component';
import { NumberSelectorComponent } from './number-selector/number-selector.component';

import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    AppComponent,
    ButtonListComponent,
    ButtonComponent,
    ButtonConfettiComponent,
    ButtonRefreshComponent,
    DisplayProgressComponent,
    NumberSelectorComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    DividerModule,
    BrowserAnimationsModule,
    InputNumberModule,
    FormsModule,
  ],
  providers: [WindowService, AppStoreService, DataInitService],
  bootstrap: [AppComponent],
})
export class AppModule {}
