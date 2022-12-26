import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { taskSelector } from 'src/app/state/task/task.selector';
import { DetailDialogComponent } from '../../components/dialog-create-task/dialog-create-task.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TaskModel } from 'src/app/models/task.model';
import { selectTask } from 'src/app/state/task/task.action';
import { User } from 'src/app/models/model.user';
import { CacheService } from 'src/app/services/cache.service';
import { TaskJiroState } from 'src/app/state/task/task.reducer';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	tasks$ = this.store.select(taskSelector);
	taskFilteredList: Array<TaskModel> = [];
	userList: Array<User> = [];
	isFilterAll = true;
	user!: User;
	readonly FilterType = {
		All: 'All',
		ToMe: 'ToMe'
	};
	constructor(
		private dialog: MatDialog,
		private store: Store,
		private router: Router,
		private cacheSvc: CacheService,
	) {
		this.tasks$.subscribe((state: TaskJiroState) => {
			this.taskFilteredList = state.list;
		});
	}

	ngOnInit(): void {
		this.setUserList();
		this.setUser();
	}
	
	setUserList() {
		this.userList = this.cacheSvc.getUserList();
	}

	setUser() {
		this.user = this.cacheSvc.get('user');
	}

	filter(type: string) {
		this.isFilterAll = type == this.FilterType.All;
		if (type == this.FilterType.All) {
			this.tasks$.subscribe((state: TaskJiroState) => {
				this.taskFilteredList = state.list;
			});
		} else {
			this.tasks$.subscribe((state: TaskJiroState) => {
				this.taskFilteredList = state.list.filter(_task => {
					return _task.assignee && _task.assignee.name == this.user.name;
				});
			});

		}
	}

	addTask() {
		this.dialog.open(DetailDialogComponent, {
			panelClass: 'dialog-full',
			autoFocus: false
		});
	}

	gotoTaskDetail(task: TaskModel) {
		this.router.navigateByUrl(`/browse/${task.key}`).then(() => {
			this.store.dispatch(selectTask({task}));
		});
	}

}
