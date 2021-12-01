import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedService } from 'src/app/services/feed-service.service';
import { WatchlistServiceService } from 'src/app/services/watchlist-service.service';

@Component({
  selector: 'app-stocks-scroll',
  templateUrl: './stocks-scroll.component.html',
  styleUrls: ['./stocks-scroll.component.scss']
})
export class StocksScrollComponent implements OnInit {

  public newStockFollowed: Observable<string> = this.watchlistService.followStockEvent;
  public stockUnfollowed: Observable<string> = this.watchlistService.unfollowStockEvent;

  tickerSymbols: any[] = [];

  constructor(private http: HttpClient, private watchlistService: WatchlistServiceService, private feedService: FeedService) { }

  ngOnInit(): void {
<<<<<<< HEAD
    // this.feedService.setUserIDLocalStorage().subscribe((id: any) => {
    //   console.log(id)
      // this.watchlistService.getWatchlistItems(id[0].user_id).subscribe((res: any) => {
      //   console.log(res)
      // })
    // })
||||||| c6c29fa
    let userID: any = sessionStorage.getItem('userID')
    this.feedService.setUserIDLocalStorage().subscribe((id: any) => {
      this.watchlistService.getWatchlistItems(id[0].user_id).subscribe((res: any) => {
        console.log(res)
      })
    })
=======
    this.newStockFollowed.subscribe( res => {
      if (res != '') {
        this.tickerSymbols.push({"ticker": res});
        this.watchlistService.setWatchlist(this.tickerSymbols);
      }
    })
    this.stockUnfollowed.subscribe( res => {
      if (res != '') {
        for (let i = 0; i < this.tickerSymbols.length; i++) {
          if (this.tickerSymbols[i].ticker == res) {
            this.tickerSymbols.splice(i, 1);
            i = this.tickerSymbols.length;
          }
        }
      }
    })
    let userID: any = sessionStorage.getItem('userID')
    this.feedService.setUserIDLocalStorage().subscribe((id: any) => {
      this.watchlistService.getWatchlistItems(id[0].user_id).subscribe((res: any) => {
        this.tickerSymbols = res;
        this.watchlistService.setWatchlist(this.tickerSymbols);
      })
    })
  }
>>>>>>> a3429fbb9fc1d0a75fc1354591cdf5e2c1aa3307

  getTicker(tickerSymbol: any) {
    return tickerSymbol.ticker;
  }

}
