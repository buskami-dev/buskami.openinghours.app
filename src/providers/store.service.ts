import { IStore } from './../pages/shared/interfaces';
import { Observable } from 'rxjs/Observable';  
import { Injectable } from '@angular/core';
import { Store } from '../models/store.model';

declare let firebase; 
@Injectable()
export class StoreService {
 public store:Store;
 public storeList: any;
 public searchList: any;

  constructor() {
    this.storeList = firebase.database().ref('/stores'); 
  }

  
  Create(store:IStore)
  {
    this.storeList.push(store
    ).then(newStore => {
      this.storeList.child(newStore.key).child('id').set(newStore.key);
    });
  }

  GetList():Observable<Store>
  { 
      return Observable.create(observer => {
        let listener = this.storeList.on('child_added', snapshot => {
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
        this.storeList.off('child_added', listener);
      };
    });
  }

  GetDetails(storeId:string) : Store
  {
    this.storeList.child(storeId).on('value', (snapshot) => { this.store = snapshot.val(); });
    return this.store;
  }

  Search(searchParam: string)
  {
  
  }
}

