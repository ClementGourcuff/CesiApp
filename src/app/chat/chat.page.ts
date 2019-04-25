import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './messages.service';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message : string;
  messages : any = [];

  constructor(public messagesService: MessagesService,
    public router: Router, 
    private storage: Storage, 
    private network: Network,
    public platform: Platform) { 
    setInterval(() => {
      this.getMessages(); 
    },10000); 
  }

  ngOnInit() {
    if(localStorage.getItem("token") == null) {
      this.router.navigate(['/home']);
    }
    this.getMessages();
  }

  public postMessage() {
    if(this.message != null && this.message != '' && this.message != undefined) {
      this.messagesService.postMessage(this.message).subscribe(res => {
        this.getMessages();
      }, (err) => {
        console.log('Error post message', err);
      })
    }
    
  }

  public getMessages() {
    let online: boolean = true;
    
    if(this.platform.is("ios" || "android")) {
      online = this.network.type !== this.network.Connection.NONE;
    } else {
      online = navigator.onLine;
    }

    if(online) {
      this.messagesService.getMessages().subscribe(res => {
        this.messages = res.json();
        this.messages.reverse();
        this.storage.set('messages', this.messages);
      }, (err) => {
        console.log('Error recuperation messages', err);
      });
    } else {
      this.storage.get('messages').then((val) => {
        this.messages = val;
      });
    }
    
  }

}
