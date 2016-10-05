import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
//import firebase from 'firebase';
 

declare let firebase; 
@Injectable()
export class AuthDataService {
  public fireAuth: any;
  public userProfile: any;

  constructor(private platform: Platform) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  LoginUser(email: string, password: string): any 
  {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  LoginUserWithFacebook(): any
  {
    var provider = new firebase.auth.FacebookAuthProvider();
    return this.fireAuth.authWithOAuthRedirect(provider);
  }  

  LoginUserWithGoogle(): any
  {
    var provider = new firebase.auth.GoogleAuthProvider();
    return this.fireAuth.signInWithPopup(provider);
  }

   SignupUser(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        this.userProfile.child(authenticatedUser.uid).set({
          email: email
        });
      });
    });
  }

  ResetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  LogoutUser(): any {
    return this.fireAuth.signOut();
  } 
}