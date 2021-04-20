import { TestBed } from '@angular/core/testing';

import { AddressManupulationService } from './address-manupulation.service';

describe('AddressManupulationService', () => {
  let service: AddressManupulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressManupulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
