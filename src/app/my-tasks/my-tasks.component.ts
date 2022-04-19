import { Component, OnInit } from '@angular/core';
import {Task} from '../task'
//import { TASKS } from '../mock-tasks';
import { MyTaskService } from '../my-task.service';
import { TASKS } from '../mock-tasks';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})

export class MyTasksComponent implements OnInit {
  myTasks: Task[] = [];
  selectedTask ?: Task;

  newTasks: Array<Task> = [];
  completedTasks: Array<Task> = [];
  inProgressTasks: Array<Task> = [];

//  constructor() { }

  constructor(private MyTaskService: MyTaskService) {}

  getTasks(): void {
    this.MyTaskService.getTasks().subscribe(myTasks => this.myTasks = myTasks);;
  }

  ngOnInit(): void {
    this.getTasks();
   // this.initTask();
  }

  getState(number :any) {
    if(number == 0){
     return "New";
    }
    else if(number == 1){
      return "In progress";
    }
    else if(number == 2){
      return "Completed";
    }
    else{
      return "Error";
    }
}
  initTask(){
    for (let task of this.myTasks) {
      if(task.state == 0){
        this.newTasks?.push(task);
      }
      else if(task.state == 1){
        this.inProgressTasks?.push(task);
      }
      else if(task.state == 2){
        this.completedTasks?.push(task);
      }
    }
  }

  /*onSelect(task: Task): void {
    this.selectedTask = task;
  }
*/
  allowDrop(e :any) : void {
      if(e.target.classList.contains("target"))
        e.preventDefault();
  }

  drag(e :any) : void {
      e.dataTransfer.setData('text', e.target.id);
   //   console.log(e.target.id);
  }

  drop(e :any): void  {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    //e.target.appendChild(document.getElementById(data));
    if(e.target.classList.contains("newTab")){
      let tc = this.myTasks.findIndex( task => task.id == data );
      this.myTasks[tc].state = 0;

    }else if( e.target.classList.contains("inProgressTab")){
      let tc =  this.myTasks.findIndex( task => task.id == data);
      this.myTasks[tc].state = 1;
    }else if( e.target.classList.contains("completedTab")){
      let tc = this.myTasks.findIndex( task => task.id == data);
      this.myTasks[tc].state = 2;
    }
    else{
    }
  }

  filterTask(number : any, myTask: any[]): any[] {
    return myTask.filter(t => t.state == number);
  }
}
