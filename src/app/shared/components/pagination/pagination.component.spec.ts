import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should init currentPage to 1 and run setPages()', () => {
    spyOn(component, 'setPages');
    component.ngOnInit();
    expect(component.currentPage).toBe(1);
    expect(component.setPages).toHaveBeenCalled();
  });
  it('should return undefined if totalItems is null', () => {
    component.totalItems = null;
    expect(component.setPages()).toBeUndefined();
  });
  it('should return undefined if itemsPerPage is null', () => {
    component.itemsPerPage = null;
    expect(component.setPages()).toBeUndefined();
  });
  it('should set pages to equal 1 if totalItems is equal a itemsPerPage', () => {
    component.itemsPerPage = 9;
    component.totalItems = 9;
    component.currentPage = 1;
    component.setPages();
    expect(component.pages).toEqual([1]);
  });
  it('should set pages to equal 1 if totalItems is less itemsPerPage', () => {
    component.itemsPerPage = 9;
    component.totalItems = 8;
    component.currentPage = 1;
    component.setPages();
    expect(component.pages).toEqual([1]);
  });
  it('should set pages to equal [1, 2] if itemsPerPage is 9 and totalItems is 18', () => {
    component.itemsPerPage = 9;
    component.totalItems = 18;
    component.currentPage = 1;
    component.setPages();
    expect(component.pages).toEqual([1, 2]);
  });
  it('should set pages value is equal to [1, 2, 3, 4, 5, -1, 10] if itemsPerPage is 10 and totalItems is 100', () => {
    component.itemsPerPage = 10;
    component.totalItems = 100;
    component.setPages();
    expect(component.pages).toEqual([1, 2, 3, 4, 5, -1, 10]);
  });
  it('should set pages is equal [1, -1, 6, 7, 8, 9, 10] if currentPage is 100, itemsPerPage 10 and totalItems 100', () => {
    component.itemsPerPage = 10;
    component.totalItems = 100;
    component.currentPage = 10;
    component.setPages();
    expect(component.pages).toEqual([1, -1, 6, 7, 8, 9, 10]);
  });

});
