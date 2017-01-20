import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { AboutPage } from './../pages/about/about';
import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: any[];
  aboutPage: any = AboutPage;

  constructor(platform: Platform,
    public menu: MenuController) {

    this.pages = [
      { title: "Stores", icon: "time", component: TabsPage },
      { title: "About", icon: "information-circle", component: AboutPage }
    ];

    const firebaseConfig = {
      apiKey: "AIzaSyAZwVbcX0hSBasAmfYG7qgcfV7mD-EJRyI",
      authDomain: "buskami-openinghours.firebaseapp.com",
      databaseURL: "https://buskami-openinghours.firebaseio.com",
      storageBucket: "buskami-openinghours.appspot.com",
      messagingSenderId: "663873067982"
    };

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('tabs:' + user)
         this.nav.setRoot(TabsPage);
      }
      else{
         console.log('login:' + user)
         this.nav.setRoot(LoginPage);
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
    this.nav.setRoot(page.component);
  }

  Logout(): void {
    this.menu.close();
    this.menu.enable(false);
    firebase.auth().signOut().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }
  
} 
