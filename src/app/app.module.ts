import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
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
    DividerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
