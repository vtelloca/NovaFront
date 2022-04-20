import { Component, OnInit } from '@angular/core';
import {Task} from '../task'
import { TASKS } from '../mock-tasks';
import { DefaultService } from '../service/api/default.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})

export class MyTasksComponent implements OnInit {
  myTasks: Task[] = [];
  selectedTask ?: Task;
  constructor(private MyTaskService: DefaultService, public dialog: MatDialog,  private location: Location) {}

  delete : boolean = true

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.MyTaskService.getAllTASK()
      .subscribe((data) => {

        this.myTasks = data;
      });
  }

  getstatus(number :any) {
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

  allowDrop(e :any) : void {
      if(e.target.classList.contains("target"))
        e.preventDefault();
  }

  drag(e :any) : void {
      e.dataTransfer.setData('text', e.target.id);
      this.delete = false;
  }
  updateTask(task : any){
    this.MyTaskService.updateTask(task)
      .subscribe(myTask => task = myTask);
  }
  deleteAllTasks(){
    this.MyTaskService.deleteALL()
    .subscribe((data) => {

      this.myTasks = data;
    });
    this.myTasks = [];
  }

  drop(e :any): void  {
     e.preventDefault();
    const data = e.dataTransfer.getData('text');
    if(e.target.classList.contains("newTab")){
      let tc = this.myTasks.findIndex( task => task._id == data );
      this.myTasks[tc]._state = 0;
     this.updateTask(this.myTasks[tc]);

    }else if( e.target.classList.contains("inProgressTab")){
      let tc =  this.myTasks.findIndex( task => task._id == data);
      this.myTasks[tc]._state = 1;
      this.updateTask(this.myTasks[tc]);
    }else if( e.target.classList.contains("completedTab")){
      let tc = this.myTasks.findIndex( task => task._id == data);
      this.myTasks[tc]._state = 2;
      this.updateTask(this.myTasks[tc]);
    }
    else if( e.target.classList.contains("del")){
      let tc = this.myTasks.findIndex( task => task._id == data);
      this.deleteTask(this.myTasks[tc]);
      window.location.reload();
    }
    else{
    }

    this.delete = true;
  }

  deleteTask(task: any){
    this.MyTaskService.deleteByID(task._id)
      .subscribe(myTask => task = myTask);
  }

  filterTask(number : any, myTask: any[]): any[] {
    return myTask.filter(t => t._state == number);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
     window.location.reload();
    });
  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./my-tasks.component.css']
})
export class DialogContentExampleDialog {

  constructor(private MyTaskService: DefaultService, private location: Location) {}

  statusId = [
    {value: 0, viewValue: 'New'},
    {value: 1, viewValue: 'In Progress'},
    {value: 2, viewValue: 'Completed'},
  ];

  myTask: Task = {};

  create : boolean = true

  ngOnInit(): void {}

  hideCreateTask(){
    this.create = !this.create;
  }

  createTask(task : any){
    this.MyTaskService.createTask(task)
    .subscribe(myTask => {task = myTask;
      this.hideCreateTask();
    });
  }


}
