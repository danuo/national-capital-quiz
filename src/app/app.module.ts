import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AppStoreService } from 'src/shared/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonConfettiComponent } from './button-confetti/button-confetti.component';
import { ButtonListComponent } from './button-list/button-list.component';
import { ButtonComponent } from './button/button.component';
import { WindowService } from './window.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonListComponent,
    ButtonComponent,
    ButtonConfettiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DividerModule,
    BrowserAnimationsModule,
  ],
  providers: [WindowService, AppStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
