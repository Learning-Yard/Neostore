import { TestBed } from '@angular/core/testing';

import { AuthconfirmGuard } from './authconfirm.guard';

describe('AuthconfirmGuard', () => {
  let guard: AuthconfirmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthconfirmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
