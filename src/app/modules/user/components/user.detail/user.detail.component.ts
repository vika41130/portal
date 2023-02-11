import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Constants } from 'src/app/constants';
import { User } from 'src/app/models/model.user';
import { CacheService } from 'src/app/services/cache.service';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user.detail.component.html',
	styleUrls: ['./user.detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges {

	userForm!: FormGroup;
	countryList = Constants.countryList;
	countryFilteredList$: Observable<string[]> | undefined;
	errorMsg = {
		required: 'This field is required.',
		emailInvalid: 'Email is invalid.',
		emailExist: 'Email is existed.',
		passwordNotMatch: 'Password not matched.',
		nickNameExist: 'Nickname is existed.'
	};
	@Input() user = new User();
	@Output() save = new EventEmitter<User>();
	constructor(
		private formBuilder: FormBuilder,
		private cacheSvc: CacheService,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.buildForm();
		this.processFormChange();
		this.setFormValue(this.user);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['user']) {
			this.setFormValue(changes['user'].currentValue);
		}
	}

	private buildForm() {
		this.userForm = this.formBuilder.group({
			nickName: ['', [Validators.maxLength(40), Validators.required]],
			passWord: ['', [Validators.required]],
			confirmPassWord: ['', [Validators.required]],
			email: ['', [Validators.email, Validators.required]],
			phone: ['', [Validators.maxLength(15), Validators.required]],
			country: ['', [Validators.required]]
		});
	}

	private setFormValue(user: User) {
		if (this.user.nickName) {
			this.nickName?.setValue(user.nickName);
			this.passWord?.setValue(user.passWord);
			this.confirmPassWord?.removeValidators(Validators.required);
			this.email?.setValue(user.email);
			this.email?.disable();
			this.phone?.setValue(user.phone);
			this.country?.setValue(user.country);
		}
	}

	private processFormChange() {
		this.countryFilteredList$ = this.country?.valueChanges.pipe(
			map(value => {
				return value ? this.countryList.filter(_value => _value.includes(value)) : this.countryList.slice();
			})
		);
		this.passWord?.valueChanges
			.pipe(
				tap(value => {
					if (this.passWord?.valid && this.confirmPassWord?.valid) {
						if (this.passWord.value != this.confirmPassWord.value) {
							this.confirmPassWord.setErrors({ passwordNotMatched: true });
						} else {
							this.confirmPassWord.setErrors(null);
						}
					}
				})
			).subscribe();
		this.confirmPassWord?.valueChanges
			.pipe(
				tap(value => {
					if (this.passWord?.valid && this.confirmPassWord?.valid) {
						if (this.passWord.value != this.confirmPassWord.value) {
							this.confirmPassWord.setErrors({ passwordNotMatched: true });
						} else {
							this.confirmPassWord.setErrors(null);
						}
					}
				})
			).subscribe();
	}

	get nickName() {
		return this.userForm?.get('nickName');
	}

	get passWord() {
		return this.userForm?.get('passWord');
	}

	get confirmPassWord() {
		return this.userForm?.get('confirmPassWord');
	}

	get email() {
		return this.userForm?.get('email');
	}

	get phone() {
		return this.userForm?.get('phone');
	}

	get country() {
		return this.userForm?.get('country');
	}

	displayFn(country: string): string {
		return country;
	}

	checkNickNameExist() {
		if (!this.nickName?.hasError('required')) {
			const nickNameExist = this.cacheSvc.checkNickNameExist(this.nickName?.value);
			if (nickNameExist) {
				this.nickName?.setErrors({ nickNameExist: true });
			} else {
				this.nickName?.setErrors(null);
			}
		}
	}

	checkEmailExist() {
		if (!this.email?.hasError('required') && !this.email?.hasError('email')) {
			const emailExist = this.cacheSvc.checkEmailExist(this.email!.value);
			if (emailExist) {
				this.email?.setErrors({ emailExist: true });
			} else {
				this.email?.setErrors(null);
			}
		}
	}

	submit() {
		const _user = new User(this.nickName?.value, this.passWord?.value, this.email?.value, this.phone?.value, this.country?.value);
		this.save.emit(_user);
	}

}
