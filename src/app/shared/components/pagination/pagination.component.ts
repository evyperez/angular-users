import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() itemsPerPage: number;
  @Input() totalItems: number;
  @Input() pagesMaxSize = 7;
  pages: Array<number>;
  totalPages: number;
  currentPage: number;

  constructor(private paginationService: PaginationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.totalItems?.firstChange) {
      this.setPages();
    }
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.setPages();
  }

  setPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = new Array<number>();

    if (this.totalPages <= this.pagesMaxSize) {
      for (let index = 0; index < this.totalPages; index++) {
        this.pages.push(index + 1);
      }
    } else if (this.currentPage > this.pagesMaxSize - 2) {
      if (this.currentPage >= this.totalPages - 4) {
        this.pages = [1, -1, this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages];
      } else {
        this.pages = [1, -1, this.currentPage - 1, this.currentPage, this.currentPage + 1, -1, this.totalPages];
      }
    } else {
      this.pages = [1, 2, 3, 4, 5, -1, this.totalPages];
    }
  }

  trackByFn(index, item) {
    return index;
  }

  setPage(page: number, index?: number) {
    this.currentPage = page;

    if (index && index === 5) {
      this.currentPage = this.pages[index - 1] + 2;
    }
    if (index && index === 1) {
      this.currentPage = this.pages[index + 1] - 2;
    }

    this.paginationService.setCurrentPage(this.currentPage);
    this.setPages();
  }
}
