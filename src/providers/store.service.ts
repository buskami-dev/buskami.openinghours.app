import { IStore } from './../pages/shared/interfaces';
import { Store } from '../models/store.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

declare let firebase;

@Injectable()
export class StoreService {
  public store: Store;
  public stores: any = firebase.database().ref('/stores');

  constructor() {
  }

  Create(store: IStore): void {
    this.stores.push(store
    ).then(newStore => {
      this.stores.child(newStore.key).child('id').set(newStore.key);
    });
  }

  GetList(): Observable<Store> {
    return Observable.create(observer => {
      let listener = this.stores.on('child_added', snapshot => {
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
        this.stores.off('child_added', listener);
      };
    });
  }

  GetDetails(storeId: string): Store {
    this.stores.child(storeId).on('value', (snapshot) => { this.store = snapshot.val(); });
    return this.store;
  }
}

