import { Component, OnInit ,Input} from '@angular/core';
import {Task} from '../task'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MyTaskService } from '../my-task.service';


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
    private MyTaskService: MyTaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.MyTaskService.getTask(id)
      .subscribe(myTask => this.myTask = myTask);
  }

  selectState(event: any, task : any) {
    task.state = event.target.value;
  }

  delete(task : any){

  }
}
