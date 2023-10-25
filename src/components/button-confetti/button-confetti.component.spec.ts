import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonConfettiComponent } from './button-confetti.component';

describe('ButtonConfettiComponent', () => {
  let component: ButtonConfettiComponent;
  let fixture: ComponentFixture<ButtonConfettiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonConfettiComponent]
    });
    fixture = TestBed.createComponent(ButtonConfettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
