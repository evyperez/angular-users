import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Result } from 'src/app/models/result.model';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() result: Result;
  sortUsers = 'login_asc';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.result?.firstChange) {
      this.sortUsers = 'login_asc';
      this.sort();
    }
  }

  ngOnInit(): void {
    this.sort();
   }

  sort() {
    const sortCategory = this.sortUsers.split('_')[0];
    const sortOrderby =this.sortUsers.split('_')[1];

    if(sortOrderby === 'asc') {
      this.result.items = this.result.items.sort((a,b) => b[sortCategory].localeCompare(a[sortCategory]));
    }
    if(sortOrderby === 'desc') {
      this.result.items = this.result.items.sort((a,b) => a[sortCategory].localeCompare(b[sortCategory]));
    }
  }
}
