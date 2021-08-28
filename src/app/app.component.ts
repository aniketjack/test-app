import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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
  showHeader: boolean = false;

  constructor(
    private waitingLoader: WaitingLoaderService,
    private router: Router
  ){
    // waiting loader service watcher for global use
    this.waitingLoader.status.subscribe((val: boolean)=>{
      this.showLoader = val;
    });

    // Handle header in case of Login page
  // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showHeader = false;
        } else {
          // console.log("NU")
          this.showHeader = true;
        }
      }
    });
  
  }

}
