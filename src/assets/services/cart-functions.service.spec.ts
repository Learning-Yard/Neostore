import { TestBed } from '@angular/core/testing';

import { CartFunctionsService } from './cart-functions.service';

describe('CartFunctionsService', () => {
  let service: CartFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
