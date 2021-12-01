import { Injectable } from '@angular/core';

import firebase from "firebase/compat/app"
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { FeedService } from './feed-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationEventEmitter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authenticationEvent: Observable<boolean> = this.authenticationEventEmitter.asObservable();

  constructor(public afAuth: AngularFireAuth, private userService: UserService, private feedService: FeedService) {
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

  async SignUp(email: string, password: string, username: string, firstName: string, lastName: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password)
      console.log(result);
      localStorage.setItem('username', JSON.stringify(username));
      localStorage.setItem('firstName', JSON.stringify(firstName));
      localStorage.setItem('lastName', JSON.stringify(lastName));

      this.userService.addUser(result.user);
    } catch (error) {
      console.log(error);
    }
  }

  async SignIn(email: string, password: string) {
    if (email === "") {
      alert('Please enter a valid email address');
    }
    else if (password === "") {
      alert('Please enter a valid password');
    } 
    else {
      try {
        const result = await this.afAuth.signInWithEmailAndPassword(email, password)
        console.log(result);
      } catch (error: any) {
        console.log(error);
        if (error.message.startsWith('Firebase: The password is invalid')) {
          alert("Password entered was incorrect. Please try again");
        }
        else if (error.message.startsWith('Firebase: The email address is badly formatted')) {
          alert('Email entered is invalid. Please try again');
        }
        else if (error.message.startsWith('Firebase: There is no user record corresponding')) {
          alert('This email address does not exist in our system. Press the Sign Up Button to Register');
        }
      }
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
      console.log(result)
      localStorage.setItem('userInfo', JSON.stringify(result.user));
      localStorage.setItem('username', JSON.stringify(result.user?.displayName));
      localStorage.setItem('firstName', JSON.stringify(result.user?.displayName?.split(' ')[0]));
      localStorage.setItem('lastName', JSON.stringify(result.user?.displayName?.split(' ')[1]));
      localStorage.setItem('email', JSON.stringify(result.user?.email))
      this.feedService.setUserIDLocalStorage().subscribe((id: any) => {
        console.log(id)
      })
      this.userService.addUser(result.user);
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
