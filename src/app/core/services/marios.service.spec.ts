import { TestBed } from '@angular/core/testing';

import { MariosService } from './marios.service';

describe('MariosService', () => {
  let service: MariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
