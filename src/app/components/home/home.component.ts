import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
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

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private waitingLoader: WaitingLoaderService
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
       this.posts = result;
       console.log("Posts Result >>>> ", result);
       this.waitingLoader.display(false);
    }, err=>{

    })
  }

}
