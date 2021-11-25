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

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(this.setSession.bind(this));
  }

  private setSession(user: firebase.User | null): void {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
      this.authenticationEventEmitter.next(true);
    } else {
      this.resetSession();
    }
  }

  async SignUp(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      localStorage.setItem('userInfo', JSON.stringify(result.user));
      this.authenticationEventEmitter.next(true);
    } catch (error) {
      console.log(error);
    }
  }

  public getName(): string {
    return (JSON.parse(localStorage.getItem('userInfo') || '{}')).displayName;
  }

  public getUserPhotoUrl(): string {
    return (JSON.parse(localStorage.getItem('userInfo') || '{}')).photoURL;
  }

  private resetSession(): void {
    localStorage.removeItem('userInfo');
    this.authenticationEventEmitter.next(false);
  }

  public signOut() {
    firebase.auth().signOut()
      .catch((error) => {
        console.error('Error: Sign out returned an error');
        console.error(error);
      })
      .finally(() => {
        this.resetSession();
      });
  }
}
