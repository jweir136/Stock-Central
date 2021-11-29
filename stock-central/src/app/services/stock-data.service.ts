import { HttpRequest, HttpEvent, HttpEventType, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }

  public getStockBasicPriceInfo(ticker: string) {
    return this.http.get(environment.IEX_BASE_SANBOX_URL + ticker + '/quote?token=' + environment.IEX_SANDBOX_KEY);

  //   let companyName = '';
  //   let latestPrice = '';
  //   const request: string = 'http://localhost:3000/api/quote/' + ticker;
  //   const get: HttpRequest<unknown> = new HttpRequest('GET', request, null, {
  //     reportProgress: false,
  //     responseType: 'json'
  //   });
  //   let httpRequestSubscription: Subscription;
  //   const httpRequestObservable: Observable<HttpEvent<unknown>> = this.http.request(get);
  //   new Promise((resolve, reject) => {
  //     httpRequestSubscription = httpRequestObservable.subscribe( // initiates the http request
  //       (event: HttpEvent<any>) => {
  //         if (HttpEventType.Response === event.type) { // finished
  //           console.log(event.body);
  //           companyName = event.body.companyName;
  //           latestPrice = event.body.latestPrice;
  //         }
  //       },
  //       (error) => {
  //         console.debug(error);
  //         reject(error);
  //       },
  //       () => {
  //         resolve(true);
  //       }
  //     );
  //   });
  //   return [companyName, latestPrice]
  }

  public getStockPriceBasicInfoBatch(tickers: string[]) {
    let tickersString: string = tickers.join()
    return this.http.get(`https://sandbox.iexapis.com/v1/stock/market/batch?types=quote&symbols=${tickersString}&token=Tpk_12e6eee6ed7d4026a0a87dee063b86bd`)

  }

  public getStockNews(ticker: string) {
    return this.http.get('http://localhost:3000/api/companyNews/' + ticker)
  }

}
