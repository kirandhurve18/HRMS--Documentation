import { TestBed } from '@angular/core/testing';

import { SpinnerHelper } from './spinner-helper';

describe('SpinnerHelper', () => {
  let service: SpinnerHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
