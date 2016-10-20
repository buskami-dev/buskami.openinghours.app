import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { FavoritesPage } from '../pages/favorites/favorites';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { StoreCreatePage } from '../pages/store-create/store-create';
import { StoreDetailsPage } from '../pages/store-details/store-details';
import { StoresPage } from '../pages/stores/stores';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthDataService } from './../providers/authdata.service';
import { StoreService } from './../providers/store.service';
import { ProfileService } from './../providers/profile.service';
import { FavoriteService } from './../providers/favorite.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    FavoritesPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    StoreCreatePage,
    StoreDetailsPage,
    StoresPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    FavoritesPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    StoreCreatePage,
    StoreDetailsPage,
    StoresPage,
    TabsPage
  ],
    providers: [
    AuthDataService,
    ProfileService,
    StoreService,
    FavoriteService
  ]
})
export class AppModule {}
