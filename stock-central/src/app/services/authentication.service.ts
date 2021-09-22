import { Injectable } from '@angular/core';

import firebase from "firebase/compat/app"
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationEventEmitter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authenticationEvent: Observable<boolean> = this.authenticationEventEmitter.asObservable();

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      console.log('You have been successfully logged in!');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
