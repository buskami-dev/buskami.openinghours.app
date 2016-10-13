import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

declare let firebase;

@Injectable()
export class AuthDataService {
  public fireAuth: any = firebase.auth();
  public userProfile: any = firebase.database().ref('/userProfile');

  constructor(private platform: Platform) {
  }

  LoginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
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