import { TestBed } from '@angular/core/testing';

import { PasserService } from './passer.service';

describe('PasserService', () => {
  let service: PasserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
