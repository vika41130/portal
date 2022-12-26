import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CacheService } from 'src/app/services/cache.service';
import { resetTask } from 'src/app/state/task/task.action';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor(
		private cacheSvc: CacheService,
		private router: Router,
		private store: Store,
	) { }

	ngOnInit(): void {
	}

	logout() {
		this.cacheSvc.clear();
		this.router.navigateByUrl('/login');
		this.store.dispatch(resetTask());
	}

}
