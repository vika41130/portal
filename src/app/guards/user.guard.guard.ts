import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheService } from '../services/cache.service';

@Injectable({
	providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
	constructor(
		private cacheSvc: CacheService,
		private router: Router,
	) {

	}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.cacheSvc.get('user')) {
			return true;
		} else {
			this.router.navigateByUrl('user/register');
			return false;
		}
	}

}
