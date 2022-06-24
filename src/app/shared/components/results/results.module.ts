import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';

@NgModule({
  declarations: [ResultsComponent],
  exports: [ResultsComponent],
  imports: [CommonModule],
})
export class ResultsModule {}
