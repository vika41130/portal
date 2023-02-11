import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/model.user';
import { CacheService } from 'src/app/services/cache.service';

@Component({
	selector: 'app-user-detail-page',
	templateUrl: './user.detail.page.component.html',
	styleUrls: ['./user.detail.page.component.scss']
})
export class DetailPageComponent implements OnInit {

	user!: User;
	constructor(
		private cacheSvc: CacheService,
	) {

	}

	ngOnInit(): void {
		this.user = this.cacheSvc.getCurrentUser();
	}

	onSave(user: User) {
		this.cacheSvc.updateUser(user);
	}

}
