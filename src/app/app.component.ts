import { AuthDataService } from './../providers/authdata.service';
import { AboutPage } from './../pages/about/about';
import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
//import firebase from 'firebase';

import { AngularFire } from 'angularfire2';

declare let firebase: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  public rootPage :any
  aboutPage: any = AboutPage;
  tabsPage: any = TabsPage;

  constructor(platform: Platform, 
            af: AngularFire, 
            public menu: MenuController, 
            public authDataService : AuthDataService) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.rootPage = TabsPage;
          console.log("I'm here! TabsPage");
        } else {
          this.rootPage = LoginPage;
          console.log("I'm here! LoginPage");
        }
      });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  OpenPage(page): void {
    this.menu.close();
    this.nav.setRoot(page);
  }

  Logout(): void {
    this.menu.close();
    this.menu.enable(false);
    this.authDataService.LogoutUser().then(() => {
    this.nav.setRoot(LoginPage);
  });
  }
}
