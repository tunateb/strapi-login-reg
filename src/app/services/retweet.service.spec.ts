import { TestBed } from '@angular/core/testing';

import { RetweetServiceService } from './retweet.service';

describe('RetweetServiceService', () => {
  let service: RetweetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetweetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
