import { TestBed } from '@angular/core/testing';

import { CheckDataService } from './check-data.service';

describe('CheckDataService', () => {
  let service: CheckDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
