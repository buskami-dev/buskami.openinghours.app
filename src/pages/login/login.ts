import { AuthDataService } from './../../providers/authdata.service';
import { NavController, LoadingController, AlertController, ModalController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { TabsPage } from './../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  loader: any;
  loginGroup:any;
  user = { email: '', password: '' };

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authDataService: AuthDataService,
    public modalCtrl: ModalController,
    public menu: MenuController,
    public formBuilder: FormBuilder)
  { 
    //console.log('constructor login');
    this.menu.enable(false);

      this.loginGroup = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }); 
  }

  Login(event) {
    //event.preventDefault();
    //console.log(this.loginGroup.value);
    
    if (this.loginGroup.valid)
    {
      this.ShowLoading()

      this.authDataService.LoginUser(this.user.email, this.user.password).then((authData) => {
        this.loader.dismiss();
        this.menu.enable(true);
        //console.log('going to TabsPage');
        this.navCtrl.setRoot(TabsPage);
      }).catch((error) => {
        this.ShowError(error);
      });
    }
    else
    {
      let prompt = this.alertCtrl.create({
        subTitle: "Please enter your email and password",
        buttons: ['OK']
      });
      prompt.present();
    }
  }

  LoginFacebook() {
    this.ShowLoading();
    this.authDataService.LoginUserWithFacebook().then((result) => {
      console.log(result.facebook.accessToken);
      this.loader.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }).catch((error) => {
      this.ShowError(error);
    });

  }

  LoginGoogle() {
    this.ShowLoading();
    this.authDataService.LoginUserWithGoogle().then((result) => {
      console.log(result.user);
      console.log(result.credential);
      this.loader.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }).catch((error) => {
      this.ShowError(error);
    });
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