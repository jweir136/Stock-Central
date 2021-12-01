import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowStockService {

  constructor(private http: HttpClient) { }

  followStock(req: any) {
    //return this.http.get('http://localhost:3000/api/getWatchlistItems/' + <any>localStorage.getItem('userID'));
    return this.http.post<any>('http://localhost:3000/api/addToWatchlist', req).subscribe(data => {
      console.log(data);
    })
  }

  getWatchlist() {
    let num = parseInt(<string>localStorage.getItem('userID'));
    return this.http.get('http://localhost:3000/api/getWatchlistItems/' + num);
  }
}
