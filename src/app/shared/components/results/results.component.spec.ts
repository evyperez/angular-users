import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { mockResult } from '../../mocks/result.mock';
import { PaginationModule } from '../pagination/pagination.module';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      imports: [CommonModule, PaginationModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should not throw error even if result has no items`, () => {
    component.result = {
      total_count: 0,
      incomplete_results: false,
      items: [],
    };
    expect(component.sort()).toBeUndefined();
  });

  it(`should sort if result have items`, () => {
    component.result = mockResult;
    expect(component.sort()).toBeUndefined();
  });
});
