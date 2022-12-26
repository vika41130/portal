import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskModeEnum } from 'src/app/enums/task.mode';
import { TaskModel } from 'src/app/models/task.model';
import { selectTask, updateTask } from 'src/app/state/task/task.action';
import { TaskDetailComponent } from '../../components/task-detail/task-detail.component';

@Component({
	selector: 'app-task-detail-page',
	templateUrl: './task-detail-page.component.html',
	styleUrls: ['./task-detail-page.component.scss']
})
export class TaskDetailPageComponent implements OnInit {

	taskKey!: string;
	TaskModeEnum = TaskModeEnum;
	task!: TaskModel | undefined;
	@ViewChild('taskDetail') taskDetail!: TaskDetailComponent;
	constructor(
		private store: Store,
	) {
	}

	ngOnInit(): void {
	}

	update() {
		const task = this.taskDetail?.getTask();
		task.updated = new Date();
		this.store.dispatch(selectTask({task}));
		this.store.dispatch(updateTask({task}))
	}


}
