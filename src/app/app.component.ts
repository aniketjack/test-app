import { Component } from '@angular/core';
import { WaitingLoaderService } from './services/waiting-loader/waiting-loader.service';
import * as CONST from './shared/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = CONST.APP_TITLE;
  showLoader: boolean;

  constructor(
    private waitingLoader: WaitingLoaderService
  ){
    // waiting loader service watcher for global use
    this.waitingLoader.status.subscribe((val: boolean)=>{
      this.showLoader = val;
    })
  }

}
