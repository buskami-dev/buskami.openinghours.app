import { ProfileService } from './../../providers/profile.service';
import { AuthDataService } from './../../providers/authdata.service';
import { Profile } from './../../models/profile.model';
import { App, NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public userProfile: any;
  public profile: Profile = {id:"", email:"", firstName:"", lastName:"", birthDate: "", gender: ""};

  constructor(public nav: NavController, public profileService: ProfileService,
    public authDataService: AuthDataService, public alertCtrl: AlertController, public app: App) {
  }

  ionViewDidLoad() {
      this.profileService.GetUserProfile().on('value', (data) => {
      this.profile.id = data.key;
      this.profile.firstName = data.val().firstname;
      this.profile.lastName = data.val().lastname;
      this.profile.birthDate = data.val().birthDate;
      this.profile.gender = data.val().gender;
    });
  }

  SaveFirstName(firstname): void {
    this.profileService.UpdateFirstName(firstname)
  }

  SaveLastName(lastname): void {
    this.profileService.UpdateLastName(lastname)
  }

  SaveBirthDate(birthDate): void {
    this.profileService.UpdateBirthDate(birthDate);
  }

  SaveGender(gender): void {
    this.profileService.UpdateGender(gender);
  }

  LogOut(): void {
    this.authDataService.LogoutUser().then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
}
