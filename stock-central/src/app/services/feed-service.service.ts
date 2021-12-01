import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) {
  }

  public setUserIDLocalStorage(email: any) {
    // let email = localStorage.getItem('email')
    console.log(email)
    return this.http.get(environment.API_BASE_URL + `/users/${email}`)
  }

  public generateFeed(userID: any) {
    // let userID = sessionStorage.getItem('userID')
    console.log(userID)
    return this.http.get(environment.API_BASE_URL + `/posts/generateFeed/${userID}`)
  }

  public getUsernamesForFeed(userID: number) {
    return this.http.get(environment.API_BASE_URL + `/getUsernames/${userID}`)
  }
}
