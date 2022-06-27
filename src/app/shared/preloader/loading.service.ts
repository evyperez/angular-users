import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  active: Subscription = new Subscription();

  constructor() {
    this.active.closed = true;
  }
}

