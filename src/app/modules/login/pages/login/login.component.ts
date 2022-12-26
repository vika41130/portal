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
		this.setUp();
		this.router.navigateByUrl('dashboard');
	}
	setUp() {
		const user = new User(this.userName?.value, '');
		this.cacheSvc.set('user', user);
		const userList: Array<User> = [
			{
				name: 'John',
				role: ''
			},
			{
				name: 'David',
				role: ''
			},
			{
				name: 'Richard',
				role: ''
			}
		];
		this.cacheSvc.set('user_list', userList);
	}

}
