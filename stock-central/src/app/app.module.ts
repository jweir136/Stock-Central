import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './header/sign-in/sign-in.component';
import { UserProfileComponent } from './header/user-profile/user-profile.component';
import { StocksScrollComponent } from './main-page/stocks-scroll/stocks-scroll.component';
import { StockCardComponent } from './main-page/stocks-scroll/stock-card/stock-card.component';
import { UserPostCardComponent } from './main-page/user-post-scroll/user-post-card/user-post-card.component';
import { UserPostScrollComponent } from './main-page/user-post-scroll/user-post-scroll.component';
import { PostCreationComponent } from './main-page/post-creation/post-creation.component'


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    SignInComponent,
    UserProfileComponent,
    StocksScrollComponent,
    StockCardComponent,
    UserPostCardComponent,
    UserPostScrollComponent,
    PostCreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
