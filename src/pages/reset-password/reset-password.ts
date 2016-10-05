import { AuthDataService } from './../../providers/authdata.service';

import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  loader: any;
  user = {email: '', password: ''};

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public loadingCtrl: LoadingController, 
              public authDataService : AuthDataService) 
              {}

  public ResetPassword() {
    this.ShowLoading()
    this.authDataService.ResetPassword(this.user.email).then((user) => {
      this.loader.dismiss().then(() => {
        let prompt = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'We just sent you a reset link to your email',
          buttons: [
            { text: "Ok",
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
        });
        prompt.present();
      });
    }).catch((error) => {
      this.ShowError(error);
    });
  }

  ShowLoading() {
    this.loader = this.loadingCtrl.create({content: 'Please wait...'});
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
