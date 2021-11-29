import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import { StockDataService } from '../services/stock-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userLoggedIn$: Observable<boolean> = this.authenticationService.authenticationEvent;

  popup = false;

  public constructor(private authenticationService: AuthenticationService, private stockDataService: StockDataService) {
  }

  ngOnInit(): void {
    
  }

  getInput() {
    return (<HTMLInputElement>document.getElementById("searchBar")).value;
  }

  search() {
    this.popup = true;
  }

}
