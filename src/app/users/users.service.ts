import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/Http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	constructor(public http: Http) { }

	public getUsers(): Observable<Response> {
		const headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('token', localStorage.getItem("token"));
		return this.http.get('http://cesi.cleverapps.io/users', {headers: headers});
	}
}
