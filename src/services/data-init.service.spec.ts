import { TestBed } from '@angular/core/testing';

import { DataInitService } from './data-init.service';

describe('DataInitService', () => {
  let service: DataInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
