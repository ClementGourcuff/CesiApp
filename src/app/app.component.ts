import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public token: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    setInterval(() => {
      this.token = localStorage.getItem('token'); 
    },1000); 
    
  }

  redirect(page) {
    this.router.navigate(["/" + page]);
    this.menuCtrl.close();
  }

  logout() {
    this.router.navigate(["/home"]);
    localStorage.removeItem("token");
    this.menuCtrl.close();
  }
}
