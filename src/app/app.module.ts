import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AppComponent } from 'src/app/app.component';
import { AppMenuComponent } from 'src/components/app-menu/app-menu.component';
import { ButtonConfettiComponent } from 'src/components/button-confetti/button-confetti.component';
import { ButtonListComponent } from 'src/components/button-list/button-list.component';
import { ButtonComponent } from 'src/components/button/button.component';
import { AppStoreService } from 'src/services/app-store.service';
import { DataInitService } from 'src/services/data-init.service';
import { WindowService } from 'src/services/window.service';
import { ButtonRefreshComponent } from '../components/button-refresh/button-refresh.component';
import { DisplayProgressComponent } from '../components/display-progress/display-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonListComponent,
    ButtonComponent,
    ButtonConfettiComponent,
    AppMenuComponent,
    ButtonRefreshComponent,
    DisplayProgressComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    DividerModule,
    BrowserAnimationsModule,
  ],
  providers: [WindowService, AppStoreService, DataInitService],
  bootstrap: [AppComponent],
})
export class AppModule {}
