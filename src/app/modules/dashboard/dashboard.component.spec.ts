import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsModule } from 'src/app/shared/components/results/results.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MockModule } from 'ng-mocks';
import { DashboardComponent } from './dashboard.component';
import { mockResult } from 'src/app/shared/mocks/result.mock';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [CommonModule, DashboardRoutingModule, MockModule(SearchModule), MockModule(ResultsModule)],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run setResult when receive event', () => {
    component.setResult(mockResult);
    expect(component.result).toBeDefined();
  });
});
