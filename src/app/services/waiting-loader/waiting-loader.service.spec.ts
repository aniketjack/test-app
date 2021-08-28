import { TestBed } from '@angular/core/testing';

import { WaitingLoaderService } from './waiting-loader.service';

describe('WaitingLoaderService', () => {
  let service: WaitingLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaitingLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
