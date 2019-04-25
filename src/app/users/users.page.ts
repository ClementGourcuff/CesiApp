import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {

  users : any = [];

  constructor(public usersService: UsersService,
    private storage: Storage, 
    private network: Network,
    public platform: Platform) { 
    this.getUsers();
    setInterval(() => {
      this.getUsers(); 
    },10000); 
  }

  public getUsers() {
    let online: boolean = true;

    if(this.platform.is("ios" || "android")) {
      online = this.network.type !== this.network.Connection.NONE;
    } else {
      online = navigator.onLine;
    }

    if(online) {
      this.usersService.getUsers().subscribe(res => {
        this.users = res.json();
        this.storage.set('users', this.users);
      }, (err) => {
        console.log('Error recuperation users', err);
      });
    } else {
      this.storage.get('users').then((val) => {
        this.users = val;
      });
    }
  }

}
