import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userLoggedIn$: Observable<boolean> = this.authenticationService.authenticationEvent;

  popup = false;
  autocompleteResults = false;
  tickerSymbols = [];

  public constructor(private authenticationService: AuthenticationService, private http: HttpClient) {
  }

  ngOnInit(): void {
    
  }

  getInput() {
    return (<HTMLInputElement>document.getElementById("searchBar")).value;
  }

  search() {
    this.popup = true;
    this.autocompleteResults = false;
  }

  autocomplete(event: any) {
    this.autocompleteResults = true;
    let input = this.getInput() + event.key;
    return this.http.get(environment.IEX_BASE_CLOUD_URL + 'search/' + input + '?token=' + environment.IEX_CLOUD_KEY).subscribe((res: any) => {
      console.log(res)
      this.tickerSymbols = res;
      // return res
    })
  }

  checkInput() {
    if (this.getInput() === '') {
      this.autocompleteResults = false;
    }
  }

  getSymbol(result: any) {
    return result.symbol
  }

  setInput(newInput: string) {
    (<HTMLInputElement>document.getElementById("searchBar")).value = newInput;
  }

}
