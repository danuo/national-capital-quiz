import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AppComponent } from 'src/app/app.component';
import { ConfettiButtonComponent } from 'src/components/confetti-button.component';
import { QuizElementButtonComponent } from 'src/components/quiz-element-button.component';
import { QuizElementListComponent } from 'src/components/quiz-element-list.component';
import { QuizProgressComponent } from 'src/components/quiz-progress.component';
import { QuizSizeSelector } from 'src/components/quiz-size-selector.component';
import { RefreshButtonComponent } from 'src/components/refresh-button.component';
import { AppStoreService } from 'src/services/app-store.service';
import { DataInitService } from 'src/services/data-init.service';
import { WindowService } from 'src/services/window.service';

@NgModule({
  declarations: [
    AppComponent,
    QuizElementListComponent,
    QuizElementButtonComponent,
    ConfettiButtonComponent,
    RefreshButtonComponent,
    QuizProgressComponent,
    QuizSizeSelector,
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
