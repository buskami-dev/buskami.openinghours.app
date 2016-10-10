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
    //let isFav = false;
    return this.userProfile.child(this.currentUser  + '/favorites/' + storeId).once('value');
  }

  GetFavorites() : any{
    return this.favoritesList.once('value');                      
  }

  GetList():Observable<Store>
  { 
      return Observable.create(observer => {
        let listener = this.favoritesList.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Store(
          snapshot.key,
          data.name,
          data.maplink,
          data.phone,
          data.image,
          data.description,
          data.url,
          data.openinghours
        )); 
      }, observer.error);

      return () => {
        this.favoritesList.off('child_added', listener);
      };
    });
  }
}

