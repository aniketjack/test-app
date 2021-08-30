import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    let userDetails = JSON.parse(window.sessionStorage.getItem('loggedInUser'))[0];
    let userWebLink = userDetails['website'];
    
  }

}
