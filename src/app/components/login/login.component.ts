import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private waitingLoader: WaitingLoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {}


  /******************************************************
   * 
   * @param userEmail Authenticate User
   *****************************************************/
  authenticateUser(userEmail){
    // capture users data from localstorage
    let usersData = JSON.parse(window.localStorage.getItem('users'));
    let currentValidUser = usersData.filter(user=>{
        return user['email'] == userEmail;
    });

    let check = window.sessionStorage.setItem('loggedInUser', JSON.stringify(currentValidUser));
    // clear users data from storage
    console.log("Check >>>> ", check);

    // Navigate user to Home page post success authetication
    this.router.navigateByUrl('/home');
  }

}
