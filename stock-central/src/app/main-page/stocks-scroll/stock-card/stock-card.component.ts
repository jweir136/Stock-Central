import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  @Input() tickerSymbol = '';

  companyName = '';
  latestPrice = '';

  constructor(private http: HttpClient) { }

  public popup: boolean = false

  ngOnInit(): void {
    const request: string = 'http://localhost:3000/api/quote/' + this.tickerSymbol;
    const get: HttpRequest<unknown> = new HttpRequest('GET', request, null, {
      reportProgress: false,
      responseType: 'json'
    });
    let httpRequestSubscription: Subscription;
    const httpRequestObservable: Observable<HttpEvent<unknown>> = this.http.request(get);
    new Promise((resolve, reject) => {
      httpRequestSubscription = httpRequestObservable.subscribe( // initiates the http request
        (event: HttpEvent<any>) => {
          if (HttpEventType.Response === event.type) { // finished
            console.log(event.body);
            this.companyName = event.body.companyName;
            this.latestPrice = event.body.latestPrice;
          }
        },
        (error) => {
          console.debug(error);
          reject(error);
        },
        () => {
          resolve(true);
        }
      );
    });
  }

}
