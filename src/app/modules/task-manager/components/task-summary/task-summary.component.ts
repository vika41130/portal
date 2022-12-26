import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
	selector: 'app-task-summary',
	templateUrl: './task-summary.component.html',
	styleUrls: ['./task-summary.component.scss']
})
export class TaskSummaryComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	@Input() task!: TaskModel;
	@Input() index = 0;


}
