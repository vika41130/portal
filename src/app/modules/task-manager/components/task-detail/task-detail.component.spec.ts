import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from 'src/app/state/task/task.reducer';

import { TaskDetailComponent } from './task-detail.component';

describe('TaskDetailComponent', () => {
	let component: TaskDetailComponent;
	let fixture: ComponentFixture<TaskDetailComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TaskDetailComponent],
			imports: [
				FormsModule,
				ReactiveFormsModule,
				StoreModule.forRoot({task: taskReducer}),
			]
		})
			.compileComponents();

			fixture = TestBed.createComponent(TaskDetailComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should have task', () => {
		expect(!!component.task == true).toBeTruthy()
	})
	it('should have default mode = Create', () => {
		expect(component.mode == component.TaskModeEnum.Create).toBeTruthy()
	})
});
