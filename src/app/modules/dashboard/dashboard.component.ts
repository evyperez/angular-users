import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  result: Result;
  hasResult: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  setResult(event){
    this.result = event;
    this.hasResult = true;
  }

}
