import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { MyTasksDetailComponent  } from './my-tasks-detail/my-tasks-detail.component';


const routes: Routes = [
  { path: 'tasks', component: MyTasksComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'detail/:id', component: MyTasksDetailComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
