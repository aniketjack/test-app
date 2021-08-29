import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, map, toArray } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api-service.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';
import { WaitingLoaderService } from 'src/app/services/waiting-loader/waiting-loader.service';
import * as CONST from '../../shared/app.constants';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Array<any> = [];
  copyOfTodos: Array<any> = [];
  currentUser: any;
    constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private waitingLoader: WaitingLoaderService,
    private utility: UtilityService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.sessionStorage.getItem('loggedInUser'))[0];
    this.fetchToDos();
  }

  /********************************************
   *  Fetch TODOs
   *******************************************/
  fetchToDos(){
    this.waitingLoader.display(true);
    this.apiService.get(CONST.GET_TODOS)/* .pipe(
              filter(data => data['userId'] == this.currentUser['id'] ), toArray()
           ) */
       //.pipe(map(data => data.filter(obj =>obj['userId'] == this.currentUser['id']) )    
       .subscribe(result=>{
            if(result.length > 0){
              this.todos = result.filter(data => data['userId'] == this.currentUser['id']);
              this.copyOfTodos = [...this.todos];
              console.log("Updated Album >>>> ", this.todos);
            }
            
            this.waitingLoader.display(false);
    }, err=>{})
  }

  /**********************************************
   * Show completed Todo's
   ***********************************************/
  showCompletedTodos(event){
    if(event.target.checked){
        this.todos = this.todos.filter((obj)=>{
        return obj['completed'] == event.target.checked;
        })
    }else{
        this.todos = [...this.copyOfTodos];
    }
  }

}
