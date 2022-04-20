import { Component, OnInit ,Input} from '@angular/core';
import {Task} from '../task'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DefaultService } from '../service/api/default.service';


@Component({
  selector: 'app-my-tasks-detail',
  templateUrl: './my-tasks-detail.component.html',
  styleUrls: ['./my-tasks-detail.component.css']
})
export class MyTasksDetailComponent implements OnInit {

    statusId = [
      {value: 0, viewValue: 'New'},
      {value: 1, viewValue: 'In Progress'},
      {value: 2, viewValue: 'Completed'},
    ];

  @Input() myTask?: Task;

  constructor(
    private route: ActivatedRoute,
    private MyTaskService: DefaultService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }


  getTasks(): void {
    const id = Number(this.route.snapshot.paramMap.get('_id'));
    this.MyTaskService.getByID(id)
      .subscribe(myTask => this.myTask = myTask);
  }

  updateTask(task : any){
    this.MyTaskService.updateTask(task)
      .subscribe(myTask => this.myTask = myTask);
  }

  selectstatus(event: any, task : any) {
    task.status = event.target.value;
  }

  deleteTask(){
    const id = Number(this.route.snapshot.paramMap.get('_id'));
    this.MyTaskService.deleteByID(id)
      .subscribe(myTask => this.myTask = myTask);
  }

  reload(){
    window.location.href ="/tasks";
  }
}
