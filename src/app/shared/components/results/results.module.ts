import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { PaginationModule } from '../pagination/pagination.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResultsComponent],
  exports: [ResultsComponent],
  imports: [CommonModule, PaginationModule, FormsModule,
  ],
})
export class ResultsModule { }
