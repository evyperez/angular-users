import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { Result } from 'src/app/models/result.model';
import { mockResult } from '../../mocks/result.mock';
import { of } from 'rxjs';
import { SearchComponent } from './search.component';
import { SearchService } from './search.service';
import { By } from '@angular/platform-browser';

class MockSearchService {
  getResult(query: string, perPage: number, page: number): Observable<Result> {
    throw new Error('Method not implemented.');
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [CommonModule, ReactiveFormsModule],
      providers: [{ provide: SearchService, useClass: MockSearchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create form', () => {
    component.createForm();
    expect(component.form).toBeTruthy();
  });
  it('should get result when run getResult()', () => {
    component.form.controls.search.setValue('test');
    spyOn(searchService, 'getResult').and.returnValue(of(mockResult));
    component.getResult();
    expect(component.result).toBeTruthy();
    expect(component.result.total_count).toBe(mockResult.total_count);
    expect(component.result.items).toBeDefined();
    expect(component.result.items.length).toBeGreaterThan(0);
  });

  it('should getResult return undefined if input is empty', () => {
    component.form.controls.search.setValue(null);
    spyOn(searchService, 'getResult').and.returnValue(of(mockResult));
    component.getResult();
    expect(component.result).toBeUndefined();
    expect(searchService.getResult).not.toHaveBeenCalled();
  });
  it('should throw error if getResult throw', () => {
    spyOn(searchService, 'getResult').and.returnValue(throwError(() => ({ error: { message: 'Error on API' } })));
    component.form.controls.search.setValue('test');
    component.getResult();
    expect(component.result.errorMessage).toBeDefined();
    expect(component.result.errorMessage).toBe('Error on API');
    expect(component.result.items).toBeUndefined();
  });
});
