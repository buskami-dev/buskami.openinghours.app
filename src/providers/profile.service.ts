import { Injectable } from '@angular/core';
//



declare let firebase; 
@Injectable()
export class ProfileService {
  public userProfile: any; // We'll use this to create a database reference to the userProfile node.
  public currentUser: any; // We'll use this to create an auth reference to the logged in user.
 
 
  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');
 
  }
 
  GetCurrentUser(){
    return this.currentUser.uid;
  }
  
  GetUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }
 
  UpdateFirstName(firstName: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstname: firstName
    });
  }

  UpdateLastName(lastName: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      lastname: lastName
    });
  }  
 
  UpdateDOB(birthDate: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

    UpdateGender(gender: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      gender: gender,
    });
  }
 

}