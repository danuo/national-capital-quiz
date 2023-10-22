import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonListComponent } from './button-list/button-list.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [AppComponent, ButtonListComponent, ButtonComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    RippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
