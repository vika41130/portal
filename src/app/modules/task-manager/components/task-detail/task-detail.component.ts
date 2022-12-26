import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, startWith } from 'rxjs';
import { StatusEnum } from 'src/app/enums/status.enum';
import { TaskModeEnum } from 'src/app/enums/task.mode';
import { User } from 'src/app/models/model.user';
import { TaskModel } from 'src/app/models/task.model';
import { CacheService } from 'src/app/services/cache.service';
import { selectTask, updateTask } from 'src/app/state/task/task.action';
import { taskSelected } from 'src/app/state/task/task.selector';

@Component({
	selector: 'app-task-detail',
	templateUrl: './task-detail.component.html',
	styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnChanges {

	selectedTask$ = this.store.select(taskSelected);
	constructor(
		private formBuilder: FormBuilder,
		private store: Store,
		private cacheSvc: CacheService,
	) {
		this.buildDetailForm();
		this.filteredOptions = this.assignee!.valueChanges.pipe(
			startWith(''),
			map(value => {
				const name = typeof value === 'string' ? value : value?.name;
				return name ? this._filter(name as string) : this.userList.slice();
			}),
		);
	}

	ngOnInit(): void {
		this.setUserList();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['mode']) {
			if (changes['mode'].currentValue == TaskModeEnum.Create) {
			} else {
				this.selectedTask$.subscribe((task: TaskModel) => {
					this.task = task;
					this.buildDetailForm();
					this.setDetailFormValue();
				});

			}
		}
	}

	filteredOptions: Observable<User[]>;
	detailForm!: FormGroup;
	userList: Array<User> = [];
	setUserList() {
		this.userList = this.cacheSvc.getUserList();
	}
	task: TaskModel | undefined = new TaskModel();
	@Input() mode: TaskModeEnum = TaskModeEnum.Create;
	TaskModeEnum = TaskModeEnum;
	StatusEnum = StatusEnum;

	displayFn(user: User): string {
		return user && user.name ? user.name : '';
	}

	private _filter(name: string): User[] {
		const filterValue = name.toLowerCase();

		return this.userList.filter(option => option.name.toLowerCase().includes(filterValue));
	}

	buildDetailForm() {
		this.detailForm = this.formBuilder.group({
			assignee: [],
			summary: ['', Validators.required],
			description: [''],
		});
	}

	setDetailFormValue() {
		this.assignee?.setValue(this.task?.assignee);
		this.summary?.setValue(this.task?.summary);
		this.description?.setValue(this.task?.description);
	}

	get assignee() {
		return this.detailForm?.get('assignee');
	}
	get summary() {
		return this.detailForm?.get('summary');
	}
	get description() {
		return this.detailForm?.get('description');
	}

	getTask(): TaskModel {
		const task = JSON.parse(JSON.stringify(this.task!));
		if (this.assignee?.value) {
			task!.assignee = new User(this.assignee?.value?.name, this.assignee?.value?.role);
		}
		task!.summary = this.summary?.value;
		task!.description = this.description?.value;
		return task!;
	}
	
	doAction() {
		const task = JSON.parse(JSON.stringify(this.task!));
		switch (task.status) {
			case StatusEnum.ToDo:
				task.status = StatusEnum.InProgress;
				this.store.dispatch(updateTask({task}));
				this.store.dispatch(selectTask({task}));
				break;
			case StatusEnum.InProgress:
				task.status = StatusEnum.Done;
				this.store.dispatch(updateTask({task}));
				this.store.dispatch(selectTask({task}));
				break;
			case StatusEnum.Done:
				break;
			default:
				break;
		}
	}

}
