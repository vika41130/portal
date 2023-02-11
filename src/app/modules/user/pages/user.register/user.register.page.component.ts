import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/model.user';
import { CacheService } from 'src/app/services/cache.service';

@Component({
	selector: 'app-user-register-page',
	templateUrl: './user.register.page.component.html',
	styleUrls: ['./user.register.page.component.scss']
})
export class RegisterPageComponent implements OnInit {

	constructor(
		private router: Router,
		private cacheSvc: CacheService
	) { }

	ngOnInit(): void {
	}

	onSave(user: User) {
		this.cacheSvc.addUserToDb(user);
		this.router.navigateByUrl('login');
	}

}
