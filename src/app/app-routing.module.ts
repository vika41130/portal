import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { NotFoundComponent } from './shares/components/not-found/not-found.component';

const routes: Routes = [
	{
		pathMatch: 'full',
		path: '',
		redirectTo: 'user'
	},
	{
		path: 'user',
		loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
	},
	{
		canActivate: [LoginGuard],
		path: 'login',
		loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
