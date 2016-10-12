import { Store } from './../../models/store.model';
import { StoreService } from './../../providers/store.service';
import { IStore } from './../shared/interfaces';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-store-create',
  templateUrl: 'store-create.html'
})
export class StoreCreatePage {
  loader: any;
  store: Store = {
    id: "",
    name: "",
    address: "",
    mapLink: "",
    phone: "",
    url: "",
    image: "",
    description: ""
  }
  constructor(public navCtrl: NavController,
    public StoreService: StoreService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }

  CreateStore() {
    this.ShowLoading();

    let newStore: IStore = {
      id: null,
      name: this.store.name,
      address: this.store.address,
      mapLink: "http://www.pccur.com",
      phone: this.store.phone,
      url: this.store.url,
      image: "http://www.inspyro.be/images/small%20logo%20spark%20transparant%20background.png",
      description: "computers, keyboards, mouse, cables",
    };

    this.StoreService.Create(newStore);
    this.ShowSuccess('Your new store was created!');
  }

  ShowLoading(): void {
    this.loader = this.loadingCtrl.create({ content: 'Please wait...' });
    this.loader.present();
  }

  ShowSuccess(text: string): void {
    this.loader.dismiss().then(() => {
      let prompt = this.alertCtrl.create({
        title: text,
        subTitle: text,
        buttons: ['OK']
      });
      prompt.present();
    });
  }

  ShowError(text: string): void {
    setTimeout(() => {
      this.loader.dismiss();
    });

    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }
}




