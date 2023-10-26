import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProgressComponent } from './display-progress.component';

describe('DisplayProgressComponent', () => {
  let component: DisplayProgressComponent;
  let fixture: ComponentFixture<DisplayProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayProgressComponent]
    });
    fixture = TestBed.createComponent(DisplayProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
