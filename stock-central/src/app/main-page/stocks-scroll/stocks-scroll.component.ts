import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stocks-scroll',
  templateUrl: './stocks-scroll.component.html',
  styleUrls: ['./stocks-scroll.component.scss']
})
export class StocksScrollComponent implements OnInit {

  tickerSymbols = ['AAPL', 'BA', 'DIS', 'GE', 'HD', 'NKE', 'SBUX', 'VZ']

  constructor() { }

  ngOnInit(): void {
  }

}
