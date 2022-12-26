import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DetailDialogComponent } from './components/dialog-create-task/dialog-create-task.component';
import { TaskSummaryComponent } from './components/task-summary/task-summary.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';



@NgModule({
	declarations: [
		DashboardComponent,
		TaskDetailComponent,
		DetailDialogComponent,
		TaskSummaryComponent,
		TaskDetailPageComponent
	],
	imports: [
		CommonModule,
		TaskManagerRoutingModule,
		MatDialogModule,
		MatButtonModule,
		FormsModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
	]
})
export class TaskManagerModule { }
