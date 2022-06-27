import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  currentPageChanges = new BehaviorSubject<number>(null);
  currentPageSubscription = this.currentPageChanges.asObservable();
  private page: number;

  constructor() { }

  setCurrentPage(page: number){
    if(this.page === page){
      return;
    }
    this.page = page;
    this.currentPageChanges.next(this.page);
  }

  getCurrentPage(){
    return this.page;
  }

}
