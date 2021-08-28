import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetails: any;
  userWebLink: string = '';

  constructor() { }

  ngOnInit(): void {
    /*********************************************************
   * Greet User!
   *******************************************************/
     this.userDetails = JSON.parse(window.sessionStorage.getItem('loggedInUser'))[0];
     this.userWebLink = this.userDetails['website'] || '';
     console.log("Logged In User >>>> ", this.userDetails);
  }

  navigateToUserWeb(web){
     window.open(web, '_blank');
  }

  


}
