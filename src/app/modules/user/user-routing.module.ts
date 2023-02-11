import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserGuardGuard } from 'src/app/guards/user.guard.guard';
import { HeaderComponent } from 'src/app/shares/header/header.component';
import { UserDetailComponent } from './components/user.detail/user.detail.component';
import { DetailPageComponent } from './pages/user.detail/user.detail.page.component';
import { RegisterPageComponent } from './pages/user.register/user.register.page.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				pathMatch: 'full',
				path: '',
				redirectTo: 'detail'
			},
			{
				pathMatch: 'full',
				path: 'detail',
				component: HeaderComponent,
				children: [
					{
						path: '',
						canActivate: [AuthGuard],
						component: DetailPageComponent,
					}
				]
			},
			{
				pathMatch: 'full',
				path: 'register',
				canActivate: [AuthGuard],
				component: RegisterPageComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule { }
