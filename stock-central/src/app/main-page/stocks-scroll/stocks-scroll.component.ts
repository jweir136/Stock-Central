import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed-service.service';
import { FollowStockService } from 'src/app/services/follow-stock.service';
import { StockDataService } from 'src/app/services/stock-data.service';
import { WatchlistServiceService } from 'src/app/services/watchlist-service.service';

@Component({
  selector: 'app-stocks-scroll',
  templateUrl: './stocks-scroll.component.html',
  styleUrls: ['./stocks-scroll.component.scss']
})
export class StocksScrollComponent implements OnInit {

  tickerSymbols = [];

  constructor(private http: HttpClient, private watchlistService: WatchlistServiceService, private feedService: FeedService) { }

  ngOnInit(): void {
    // this.feedService.setUserIDLocalStorage().subscribe((id: any) => {
    //   console.log(id)
      // this.watchlistService.getWatchlistItems(id[0].user_id).subscribe((res: any) => {
      //   console.log(res)
      // })
    // })


    // this.stockDataService.getStockPriceBasicInfoBatch(this.tickerSymbols).subscribe((res: any) => {
    //   console.log(res);
    //   let data: any = {};
    //   // data['companyName'] = res.companyName
    //   // data['latestPrice'] = res.latestPrice
    //   // console.log(data)
    // })
    
    /*
    this.followStockService.getWatchlist().subscribe((res: any) => {
      console.log(res)
    })
    */
  }

}
