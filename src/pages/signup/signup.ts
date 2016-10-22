import { Credentials } from './../../models/credentials.model';

import { AuthDataService } from './../../providers/authdata.service';
import { TabsPage } from './../tabs/tabs';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'signup.html'
})
export class SignupPage {
  loader: any;
  credentials : Credentials = { email: "", password: "", confirmPassword: ""};

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authDataService: AuthDataService)
  { }

  public CreateLogin() {
    if (this.credentials.password !== this.credentials.confirmPassword) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Passwords must be matched.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    else {
      this.ShowLoading()
      this.authDataService.SignupUser(this.credentials.email, this.credentials.password).then((authData) => {
        this.loader.dismiss().then(() => {
          let prompt = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Your new Account was created!',
            buttons: ['OK']
          });
          prompt.present();
        }).then(() => { this.navCtrl.setRoot(TabsPage) });
      }).catch((error) => {
        this.ShowError(error);
      });
    }
  }

  ShowLoading() {
    this.loader = this.loadingCtrl.create({ content: 'Please wait...' });
    this.loader.present();
  }

  ShowError(text) {
    this.loader.dismiss().then(() => {
      let prompt = this.alertCtrl.create({
        title: 'Fail',
        subTitle: text,
        buttons: ['OK']
      });
      prompt.present();
    });
  }
}
