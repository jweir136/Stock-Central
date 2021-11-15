import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stocks-scroll',
  templateUrl: './stocks-scroll.component.html',
  styleUrls: ['./stocks-scroll.component.scss']
})
export class StocksScrollComponent implements OnInit {

  products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  constructor() { }

  ngOnInit(): void {
  }

}
