import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheService } from '../services/cache.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private cacheSvc: CacheService,
		private router: Router,
	) {

	}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const isLogin = !!this.cacheSvc.get('current_user');
		if (state.url.includes('detail')) {
			if (isLogin) {
				return true;
			} else {
				this.router.navigateByUrl('/login');
				return false;
			}
		}
		if (state.url.includes('register')) {
			if (isLogin) {
				this.router.navigateByUrl('user/detail');
				return false;
			} else {
				return true;
			}
		}
		return true;
	}

}
