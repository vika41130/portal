import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { taskSelector } from '../state/task/task.selector';
import { firstValueFrom } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
	providedIn: 'root'
})
export class TaskServiceService {

	tasks$ = this.store.select(taskSelector);
	constructor(
		private store: Store,
	) {}

	async getTaskByKey(key: string): Promise<TaskModel | undefined> {
		return (await firstValueFrom(this.tasks$)).list.find((_task: TaskModel) => _task.key == key);
	}
}
