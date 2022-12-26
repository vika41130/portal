import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constants } from 'src/app/constants';
import { TaskModel } from 'src/app/models/task.model';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { v4 as uuidv4 } from 'uuid';
import { StatusEnum } from 'src/app/enums/status.enum';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/state/task/task.action';
import { taskCounterSelector } from 'src/app/state/task/task.selector';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-task-detail-dialog',
	templateUrl: './dialog-create-task.component.html',
	styleUrls: ['./dialog-create-task.component.scss']
})
export class DetailDialogComponent implements OnInit {

	tasksCounter$ = this.store.select(taskCounterSelector);
	constructor(
		public dialogRef: MatDialogRef<DetailDialogComponent>,
    	@Inject(MAT_DIALOG_DATA) public data: any,
		private store: Store
	) {}

	ngOnInit(): void {
	}

	@ViewChild('taskDetail') taskDetail!: TaskDetailComponent;

	cancel() {
		this.dialogRef.close();
	}

	async submit() {
		const task = new TaskModel();
		task.key = Constants.TaskKeyPrefix + (await firstValueFrom(this.tasksCounter$)).toString();
		task.id = uuidv4();
		task.summary = this.taskDetail.summary?.value;
		task.description = this.taskDetail.description?.value;
		task.status = StatusEnum.ToDo;
		task.created = new Date();
		task.isRemoved = false;
		this.store.dispatch(addTask({task}));
		this.dialogRef.close();
	}

}
