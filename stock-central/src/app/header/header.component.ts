import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userLoggedIn$: Observable<boolean> = this.authenticationService.authenticationEvent;

  public constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    
  }

}
