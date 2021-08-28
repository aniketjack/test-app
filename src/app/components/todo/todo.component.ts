import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private waitingLoader: WaitingLoaderService,
    private utility: UtilityService
  ) { }

  ngOnInit(): void {
    this.fetchToDos();
  }

  /********************************************
   *  Fetch TODOs
   *******************************************/
  fetchToDos(){
    this.waitingLoader.display(true);
    this.apiService.get(CONST.GET_TODOS).subscribe(result=>{
       this.todos = result;
       this.copyOfTodos = [...result];
       console.log("Updated Album >>>> ", this.todos);
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
