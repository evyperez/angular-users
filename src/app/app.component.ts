import { Component } from '@angular/core';
import { LoadingService } from './shared/preloader/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-search';

  constructor(
    public loadingService: LoadingService,
) { }
}

