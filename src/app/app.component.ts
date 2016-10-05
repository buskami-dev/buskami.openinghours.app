import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
//import firebase from 'firebase';

import { AngularFire } from 'angularfire2';

declare let firebase: any;

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  public rootPage :any

  constructor(platform: Platform, af: AngularFire) {

    let unsubscribe = firebase.auth().onAuthStateChanged( (user) => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else  {
        this.rootPage = LoginPage;
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
