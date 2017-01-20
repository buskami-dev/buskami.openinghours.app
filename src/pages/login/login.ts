import { Credentials } from './../../models/credentials.model';
import { AuthDataService } from './../../providers/authdata.service';
import { NavController, LoadingController, AlertController, ModalController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { TabsPage } from './../tabs/tabs';

import { Facebook } from 'ionic-native';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  submitAttempt :boolean = false;
  loader: any;
  loginGroup: any;
  credentials: Credentials = { email: "", password: "" };

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authDataService: AuthDataService,
    public modalCtrl: ModalController,
    public menu: MenuController,
    public formBuilder: FormBuilder) {
    this.menu.enable(false);
    console.log("test");

    this.loginGroup = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  elementChanged(input)
  {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  Login(event) {
    this.submitAttempt = true;

    if (this.loginGroup.valid) {
      this.ShowLoading()

      this.authDataService.LoginUser(this.credentials.email, this.credentials.password).then((authData) => {
        this.loader.dismiss();
        this.menu.enable(true);
        this.navCtrl.setRoot(TabsPage);
      }).catch((error) => {
        this.ShowError(error);
      });
    }
    else {
      let prompt = this.alertCtrl.create({
        subTitle: "Please enter your email and password",
        buttons: ['OK']
      });
      prompt.present();
    }
  }

  LoginFacebook() {
    Facebook.login(['email']).then((response) => {
      let facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          console.log("Firebase success: " + JSON.stringify(success));
          //this.userProfile = success;
        })
        .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => { console.log(error) });
  }

  GoToSignup() {
    //let modal = this.modalCtrl.create(SignupPage);
    //modal.present();
    this.navCtrl.push(SignupPage);
  }

  GoToResetPassword() {
    //let modal = this.modalCtrl.create(ResetPasswordPage);
    //modal.present();    
    this.navCtrl.push(ResetPasswordPage);
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