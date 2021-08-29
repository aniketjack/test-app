import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetails: any;
  userWebLink: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    /*********************************************************
   * Greet User!
   *******************************************************/
     this.userDetails = JSON.parse(window.sessionStorage.getItem('loggedInUser'))[0];
     this.userWebLink = this.userDetails['website'] || '';
     console.log("Logged In User >>>> ", this.userDetails);
  }
  
  /*********************************************************
   * Logout and final cleanup
   ********************************************************/
  doLogout(){
      //window.localStorage.clear();
      window.sessionStorage.clear();
      // navigate user to login 
      this.router.navigateByUrl('/login');
  }


  navigateToUserWeb(web){
     window.open(web, '_blank');
  }

  


}
