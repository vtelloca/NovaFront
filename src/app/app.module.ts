import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { FormsModule } from '@angular/forms';
import { MyTasksDetailComponent } from './my-tasks-detail/my-tasks-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { DefaultService } from './service/api/default.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogContentExampleDialog } from './my-tasks/my-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    MyTasksComponent,
    MyTasksDetailComponent,DialogContentExampleDialog
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,MatSelectModule,MatGridListModule, MatIconModule, MatDialogModule, MatTooltipModule
  ],
  providers: [DefaultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
