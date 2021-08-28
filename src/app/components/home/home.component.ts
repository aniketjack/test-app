import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';
import { WaitingLoaderService } from 'src/app/services/waiting-loader/waiting-loader.service';
import * as CONST from '../../shared/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any;
  page: number = 1;
  search: any;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private waitingLoader: WaitingLoaderService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  /********************************************
   *  Fetch posts
   *******************************************/
  fetchPosts(){
    this.waitingLoader.display(true);
    this.apiService.get(CONST.GET_POSTS).subscribe(result=>{
       this.posts = result.sort(function(a, b){
            if(a['title'] < b['title']) { return -1; }
            if(a['title'] > b['title']) { return 1; }
            return 0;
          });
       console.log("Posts Result >>>> ", this.posts);
       this.waitingLoader.display(false);
    }, err=>{

    })
  }

}
