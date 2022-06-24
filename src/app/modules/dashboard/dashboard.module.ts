import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { ResultsModule } from 'src/app/shared/components/results/results.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SearchModule, ResultsModule],
})
export class DashboardModule {}
