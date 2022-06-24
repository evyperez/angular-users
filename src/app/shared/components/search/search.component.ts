import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Result } from 'src/app/models/result.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() sendResult = new EventEmitter<Result>();
  @Input() result: Result;
  form: FormGroup;
  perPage = 9;
  page = 1;

  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit(): void {
    this.createForm();
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
    this.sendResult.emit(null);
  }

  getFormValidators(name: string) {
    return this.form?.controls[name];
  }

  getResult() {
    this.searchService.getResult(this.form.value.search, this.perPage, this.page).subscribe((response) => {
      this.sendResult.emit(response);
    });
  }
}
