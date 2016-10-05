import { ProfileService } from './../../providers/profile.service';
import { AuthDataService } from './../../providers/authdata.service';
import { Profile } from './../../models/profile.model';
import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
 
@Component({
  selector : 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public userProfile: any;
  public profile : Profile = new Profile();
 
  constructor(public nav: NavController, public profileService: ProfileService,
    public authDataService: AuthDataService, public alertCtrl: AlertController) {
 
      this.profileService.GetUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      
      this.profile.firstName = this.userProfile.firstname;
      this.profile.lastName = this.userProfile.lastname;
      this.profile.birthDate = this.userProfile.birthDate;     
      this.profile.gender = this.userProfile.gender;
    });
  }

  UpdateFirstName(firstname){
    this.profileService.UpdateFirstName(firstname)
  }

  UpdateLastName(lastname){
    this.profileService.UpdateLastName(lastname)
  }

  UpdateDOB(birthDate){
  this.profileService.UpdateDOB(birthDate);
  }

  UpdateGender(gender){
  this.profileService.UpdateGender(gender);
  }

  LogOut(){
  this.authDataService.LogoutUser().then(() => {
    this.nav.setRoot(LoginPage);
  });
  }
}
