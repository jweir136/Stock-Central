import { TestBed } from '@angular/core/testing';

import { FollowStockService } from './follow-stock.service';

describe('FollowStockService', () => {
  let service: FollowStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
