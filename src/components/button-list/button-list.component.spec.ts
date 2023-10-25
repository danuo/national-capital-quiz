import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonListComponent } from 'src/components/button-list/button-list.component';

describe('ButtonListComponent', () => {
  let component: ButtonListComponent;
  let fixture: ComponentFixture<ButtonListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonListComponent],
    });
    fixture = TestBed.createComponent(ButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
