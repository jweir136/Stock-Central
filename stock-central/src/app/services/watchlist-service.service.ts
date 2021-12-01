import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatchlistServiceService {

  private followStockEventEmitter: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public followStockEvent: Observable<string> = this.followStockEventEmitter.asObservable();

  constructor(private http: HttpClient) { }

  public getWatchlistItems(userID: number) {
    return this.http.get(environment.API_BASE_URL + `/getWatchlistItems/${userID}`)
  }

  followStock(req: any) {
    console.log(req);
    return this.http.post<any>('http://localhost:3000/api/addToWatchlist', req).subscribe(data => {
      console.log(data);
      this.followStockEventEmitter.next(req.ticker);
    })
  }
}
