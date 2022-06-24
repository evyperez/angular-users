import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  @Input() result: Result;

  constructor() {}

  ngOnInit(): void {}
}
