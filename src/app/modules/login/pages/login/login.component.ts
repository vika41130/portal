import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/model.user';
import { CacheService } from 'src/app/services/cache.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm!: FormGroup;
	invalidUser!: boolean;
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private cacheSvc: CacheService,
	) {
		this.buildLoginForm();
	}

	ngOnInit(): void {
	}

	buildLoginForm() {
		this.loginForm = this.formBuilder.group({
			userName: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
	get userName() {
		return this.loginForm.get('userName');
	}
	get password() {
		return this.loginForm.get('password');
	}
	login() {
		this.invalidUser = false;
		const user = this.cacheSvc.findUser(this.userName?.value, this.password?.value);
		if (user) {
			this.cacheSvc.setCurrentUser(user);
			this.setUp();
			this.router.navigateByUrl('user/detail');
		} else {
			this.invalidUser = true;
		}
	}
	setUp() {
		this.cacheSvc.fakeUserList();
	}

}
