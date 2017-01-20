import { Profile } from '../models/profile.model';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class ProfileService {
  profile = Profile;
  userProfile: any = firebase.database().ref('/userProfile'); 
  currentUser: any = firebase.auth().currentUser; 

  constructor() {
  }

  GetCurrentUser(): string {
    return this.currentUser.uid;
  }

  GetUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  UpdateFirstName(firstName: string): void {
    this.userProfile.child(this.currentUser.uid).update({
      firstname: firstName
    });
  }

  UpdateLastName(lastName: string): void {
    this.userProfile.child(this.currentUser.uid).update({
      lastname: lastName
    });
  }

  UpdateBirthDate(birthDate: string): void {
    this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  UpdateGender(gender: string): void {
    this.userProfile.child(this.currentUser.uid).update({
      gender: gender,
    });
  }
}