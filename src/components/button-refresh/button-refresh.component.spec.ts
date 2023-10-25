import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRefreshComponent } from './button-refresh.component';

describe('ButtonRefreshComponent', () => {
  let component: ButtonRefreshComponent;
  let fixture: ComponentFixture<ButtonRefreshComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonRefreshComponent]
    });
    fixture = TestBed.createComponent(ButtonRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
