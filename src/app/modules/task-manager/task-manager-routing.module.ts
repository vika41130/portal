import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/shares/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';

const routes: Routes = [
	{
		path: '',
		component: HeaderComponent,
		children: [
			{
				pathMatch: 'full',
				path: '',
				redirectTo: 'dashboard'
			},
			{
				pathMatch: 'full',
				path: 'dashboard',
				component: DashboardComponent
			},
			{
				path: 'browse/:key',
				component: TaskDetailPageComponent
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TaskManagerRoutingModule { }
