import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  public username: string;
  public password: string;
  public urlPhoto: string;

  constructor(public registerService: RegisterService, public router: Router) {};

	public register() {
		this.registerService.doRegister(this.username, this.password, this.urlPhoto).subscribe(res => {
      console.log({res});
      this.router.navigate(['/home']);
		}, (err) => {
			console.log('Error login', err);
		});
	}

}
