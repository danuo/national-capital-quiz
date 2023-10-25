import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AppComponent } from 'src/app/app.component';
import { ButtonConfettiComponent } from 'src/components/button-confetti/button-confetti.component';
import { ButtonListComponent } from 'src/components/button-list/button-list.component';
import { ButtonComponent } from 'src/components/button/button.component';
import { DataInitService } from 'src/services/data-init.service';
import { AppStoreService } from 'src/shared/store';
import { AppMenuComponent } from '../components/app-menu/app-menu.component';
import { WindowService } from '../services/window.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonListComponent,
    ButtonComponent,
    ButtonConfettiComponent,
    AppMenuComponent,
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
