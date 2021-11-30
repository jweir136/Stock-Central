import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatchlistServiceService {

  constructor(private http: HttpClient) { }


  public getWatchlistItems(userID: number) {
    return this.http.get(environment.API_BASE_URL + `/getWatchlistItems/${userID}`)
  }
}
