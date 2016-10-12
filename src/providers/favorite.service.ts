import { ProfileService } from './profile.service';
import { IStore } from './../pages/shared/interfaces';
import { Observable } from 'rxjs/Observable';  
import { Injectable } from '@angular/core';
import { Store } from '../models/store.model';

declare let firebase; 
@Injectable()
export class FavoriteService {
 public store:Store;
 
 public currentUser: any;
 public userProfile: any;
 public favoritesList: any;

  constructor(private profileService : ProfileService) {
    this.currentUser = profileService.GetCurrentUser();
    this.userProfile = firebase.database().ref('/userProfile/');
    this.favoritesList = firebase.database().ref('/userProfile/' + this.currentUser + '/favorites');
  }

  GetCurrentUser(){
      return this.currentUser;
  }

  SaveFavorite(storeId : string) : any{   
    return this.userProfile.child(this.currentUser + '/favorites/' + storeId).set(true);
  }

  RemoveFavorite(storeId : string) : any{   
    return this.userProfile.child(this.currentUser + '/favorites/' + storeId).remove();
  }

  IsFavorite(storeId) : any {
    return this.userProfile.child(this.currentUser  + '/favorites/' + storeId).once('value');
  }

  GetFavorites() : any{
    return this.favoritesList.once('value');                   
  }


  GetFavorites2() : any {      
      return Observable.create(observer => {
      let listener = this.favoritesList.on('value', snapshot => {
        observer.next(snapshot);
      }, observer.error);

      return () => {
        this.favoritesList.off('value', listener);
      };
    });               
  }

}

