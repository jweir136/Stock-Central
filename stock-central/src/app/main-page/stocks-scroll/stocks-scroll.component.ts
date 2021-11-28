import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StockDataService } from 'src/app/services/stock-data.service';

@Component({
  selector: 'app-stocks-scroll',
  templateUrl: './stocks-scroll.component.html',
  styleUrls: ['./stocks-scroll.component.scss']
})
export class StocksScrollComponent implements OnInit {

  tickerSymbols = ['AAPL', 'BA', 'DIS', 'SNAP', 'GE']

  constructor(private http: HttpClient, private stockDataService: StockDataService) { }

  ngOnInit(): void {
    // this.stockDataService.getStockPriceBasicInfoBatch(this.tickerSymbols).subscribe((res: any) => {
    //   console.log(res);
    //   let data: any = {};
    //   // data['companyName'] = res.companyName
    //   // data['latestPrice'] = res.latestPrice
    //   // console.log(data)
    // })
  }

}
