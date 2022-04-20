import { Injectable } from '@angular/core';
import {Task} from './task'
import { TASKS } from './mock-tasks';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyTaskService {

  constructor() {

   }

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }

  getTask(id: number): Observable<Task> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = TASKS.find(h => h._id === id)!;
    return of(hero);
  }
}
