import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Result } from 'src/app/models/result.model';
import { LoadingService } from '../../loading/loading.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() sendResult = new EventEmitter<Result>();
  result: Result;
  form: FormGroup;
  perPage = 9;
  page = 1;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private searchService: SearchService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.paginationService.currentPageSubscription.subscribe((value) => {
      if (value) {
        this.page = value;
        this.getResult(true);
      }
    });
  }

  createForm() {
    this.form = this.fb.group({
      search: [null, Validators.compose([Validators.required])],
    });
  }

  clearInput() {
    this.form.controls.search.setValue('');
  }

  clearResult() {
    this.clearInput();
    this.result = null;
    this.emitResult();
  }

  getFormValidators(name: string) {
    return this.form?.controls[name];
  }

  getResult(changePage = false) {
    if (this.form.invalid && !changePage) {
      return;
    }

    if (this.result) {
      this.result.items = null;
    }

    this.loadingService.active = this.searchService
      .getResult(this.form.value.search, this.perPage, this.page)
      .pipe(
        finalize(() => {
          this.emitResult();
        })
      )
      .subscribe({
        next: (response) => {
          this.result = response;
        },
        error: (error) => {
          if (!this.result) {
            this.result = new Result(null);
          }
          this.result.errorMessage = error.error.message;
        },
      });
  }

  emitResult() {
    this.sendResult.emit(this.result);
  }
}
