import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	// Variables de connection
	public username: string;
	public password: string;

	constructor(public loginService: LoginService, public router: Router) {};

	public login() {
		this.loginService.doLogin(this.username, this.password).subscribe(res => {
			// Stockage du token de connection dans le local storage
			localStorage.setItem("token", res.json().token);
			// Redirection vers la page chat
			this.router.navigate(['/chat']);
		}, (err) => {
			console.log('Error login', err);
		});
	}
}
