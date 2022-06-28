import { TestBed } from '@angular/core/testing';

import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set current page', () => {
    service.setCurrentPage(1);
    expect(service.getCurrentPage()).toBe(1);
  });
  it('should setCurrentPage return null if page is equal currentPage', () => {
    service.setCurrentPage(2);
    expect(service.setCurrentPage(2)).toBeUndefined();
  });
});
