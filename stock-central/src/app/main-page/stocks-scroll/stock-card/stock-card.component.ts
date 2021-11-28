import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StockDataService } from 'src/app/services/stock-data.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  @Input() tickerSymbol = '';

  companyName = '';
  latestPrice = '';
  changeAmt = 0
  changePercent: number = 0
  public change: number = 0;
  testTickers = ['AAPL', 'BA', 'DIS', 'GE', 'HD', 'NKE', 'SBUX', 'VZ']

  constructor(private http: HttpClient, private stockDataService: StockDataService) { }

  public popup: boolean = false

  ngOnInit(): void {
    this.stockDataService.getStockBasicPriceInfo(this.tickerSymbol).subscribe((res: any) => {
      // console.log(res);
      this.companyName = res.companyName
      this.latestPrice = res.latestPrice
      this.changeAmt = Math.abs(res.change)
      this.changePercent = res.changePercent.toFixed(2)
      if (res.change > 0)
        this.change = 1;
      else if (res.change < 0)
        this.change = -1;
      else
        this.change = 0;
    })
  }
}
