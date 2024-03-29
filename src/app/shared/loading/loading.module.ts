import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent as LoadingComponent } from './loading.component';

@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  imports: [CommonModule],
})
export class LoadingModule {}
