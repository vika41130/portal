import { Injectable } from '@angular/core';
import { User } from '../models/model.user';

@Injectable({
	providedIn: 'root'
})
export class CacheService {

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
	getUserList(): Array<User> {
		const str = localStorage.getItem('user_list');
		if (str) {
			return JSON.parse(str);
		} else {
			return [];
		}
	}
	clear() {
		localStorage.clear();
	}
}
