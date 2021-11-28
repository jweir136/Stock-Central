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
    let email = JSON.parse(localStorage['userInfo'])['email']
    return this.http.get(environment.API_BASE_URL + `/users/${email}`).subscribe((res: any) => {
      console.log(res)
      // return res
    })
  }

  public generateFeed() {
    return this.setUserIDLocalStorage()
    // return this.http.get(environment.API_BASE_URL + `/posts/generatedFeed/${userID}`)
  }
}
