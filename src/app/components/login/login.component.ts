import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { WaitingLoaderService } from 'src/app/services/waiting-loader/waiting-loader.service';
import * as CONST from 'src/app/shared/app.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginEmail: string = '';

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private waitingLoader: WaitingLoaderService
  ) { }

  ngOnInit(): void {
    //this.getUsers();
  }

  getUsers(){
    this.waitingLoader.display(true);
    this.apiService.get(CONST.GET_USERS).subscribe(result=>{
      console.log("Result >>> ", JSON.stringify(result));
      //this.waitingLoader.display(false);
      this.waitingLoader.display(false);
    }, err=>{
      console.log("Error Occoured!");
    })
  }

}
