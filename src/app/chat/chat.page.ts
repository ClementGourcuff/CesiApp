import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

	// Variables pour poster un message, récuperer les messages et la connection
	message : string;
	messages : any = [];
	online: boolean;

  	constructor(public messagesService: MessagesService,
    	public router: Router, 
    	private storage: Storage, 
    	private network: Network,
    	public platform: Platform) {}

  	ngOnInit() {
		// Vérification de la présence du token dans le local storage
		if(localStorage.getItem("token") == null) {
			this.router.navigate(['/home']);
		}
		// Récupération des messages à l'arrivée sur la page
		this.getMessages();
		// Récupération des messages toutes les 10 secondes
		setInterval(() => {
			this.getMessages(); 
		},10000);
  	}

	// Fonction pour poster un message
  	public postMessage() {
		if(this.message != null && this.message != '' && this.message != undefined) {
			this.messagesService.postMessage(this.message).subscribe(res => {
				this.getMessages();
			}, (err) => {
				console.log('Error post message', err);
			})
		}
    }

	// Fonction de récupération des messages
  	public getMessages() {
		this.online = true;

		// Récupération de l'information de connection en fonction du device
		if(this.platform.is("ios" || "android")) {
			this.online = this.network.type !== this.network.Connection.NONE;
		} else {
			this.online = navigator.onLine;
		}

		// Si on est connecté fait appel à l'api
		if(this.online) {
			this.messagesService.getMessages().subscribe(res => {
				// Stockage de la réponse dans la variables messages
				this.messages = res.json();
				// On inverse le tableau pour obtenir les messages les plus récents en premier
				this.messages.reverse();
				// Stockage dans le store des messages
				this.storage.set('messages', this.messages);
			}, (err) => {
				console.log('Error recuperation messages', err);
			});
		} else {
			// Si déconnecté récupération dans le store des informations messages
			this.storage.get('messages').then((val) => {
				this.messages = val;
			});
		}
  	}

}
