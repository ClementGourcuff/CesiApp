import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

@Component({
	selector: 'app-users',
	templateUrl: './users.page.html',
	styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

	// Tableau d'utilisateurs
	users : any = [];
	// Booleen connection internet
	online: boolean;

	constructor(public usersService: UsersService,
		public router: Router,
		private storage: Storage, 
		private network: Network,
		public platform: Platform) {}
	  
	ngOnInit() {
		// Vérification de la présence du token dans le local storage
		if(localStorage.getItem("token") == null) {
			this.router.navigate(['/home']);
		}
		// Récupération des utilisateurs à l'arrivée sur la page
		this.getUsers();
		// Récupération des utilisateurs toutes les 10 secondes
    	setInterval(() => {
      		this.getUsers(); 
    	},10000); 
	}

	// Fonction de récupération des utilisateurs
	public getUsers() {
		this.online = true;

		// Récupération de l'information de connection en fonction du device
		if(this.platform.is("ios" || "android")) {
			this.online = this.network.type !== this.network.Connection.NONE;
		} else {
			this.online = navigator.onLine;
		}

		// Si on est connecté fait appel à l'api
		if(this.online) {
			this.usersService.getUsers().subscribe(res => {
				// Stockage de la réponse dans la variables users
				this.users = res.json();
				// Stockage dans le store des users
				this.storage.set('users', this.users);
			}, (err) => {
				console.log('Error recuperation users', err);
			});
		} else {
			// Si déconnecté récupération dans le store des informations utilisateurs
			this.storage.get('users').then((val) => {
				this.users = val;
			});
		}
	}

}
