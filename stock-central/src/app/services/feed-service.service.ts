import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) {
  }

  public setUserIDLocalStorage() {
    let email = JSON.parse(<string>localStorage.getItem('userInfo')).email;
    return this.http.get(environment.API_BASE_URL + `/users/${email}`)
  }

  public generateFeed(userID: any) {
    return this.http.get(environment.API_BASE_URL + `/posts/generateFeed/${userID}`)
  }

  public getUsernamesForFeed(userID: number) {
    return this.http.get(environment.API_BASE_URL + `/getUsernames/${userID}`)
  }
}
