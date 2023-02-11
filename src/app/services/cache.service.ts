import { Injectable } from '@angular/core';
import { User } from '../models/model.user';

@Injectable({
	providedIn: 'root'
})
export class CacheService {

	_userList: User[] = [];
	constructor() { }

	get(key: string) {
		const str = localStorage.getItem(key);
		if (str) {
			return JSON.parse(str);
		}
		return undefined;
	}
	set(key: string, data: any) {
		localStorage.setItem(key, JSON.stringify(data));
	}
	fakeUserList(): void {
		this._userList.push(new User(
			'google', 'abc', 'abc.xyz@gmail.com', '1234567890', 'United States'
		));
		this._userList.push(new User(
			'gojek', 'jek', 'jek.xyz@gmail.com', '1234567891', 'Indonesia'
		));
		this._userList.push(new User(
			'alibaba', 'baba', 'baba.xyz@gmail.com', '1234567892', 'China'
		));
		const _currentUserList = this.getUserList();
		this._userList = this._userList.concat(_currentUserList);
		localStorage.setItem('user_list', JSON.stringify(this._userList));
	}
	getUserList(): Array<User> {
		const str = localStorage.getItem('user_list');
		if (str) {
			return JSON.parse(str);
		} else {
			return [];
		}
	}
	checkEmailExist(email: string) {
		return !!(this._userList.find(_user => _user.email == email));
	}
	checkNickNameExist(nickName: string) {
		return !!(this._userList.find(_user => _user.nickName == nickName));
	}
	findUser(username: string, password: string) {
		return this._userList.find(_user => _user.nickName == username && _user.passWord == password);
	}
	addUserToDb(user: User) {
		this._userList.push(user);
		localStorage.setItem('user_list', JSON.stringify(this._userList));
	}
	updateUser(user: User) {
		this._userList.filter(_user => _user.nickName != user.nickName);
		this._userList.push(user);
		localStorage.setItem('user_list', JSON.stringify(this._userList));
		this.setCurrentUser(user);
	}
	getCurrentUser(): User {
		return this.get('current_user');
	}
	setCurrentUser(user: User): void {
		this.set('current_user', user);
	}
	clear() {
		localStorage.removeItem('current_user');
	}
}
