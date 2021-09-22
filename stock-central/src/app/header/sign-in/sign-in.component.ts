import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public popup: boolean = false;

  public constructor(public authenticationService: AuthenticationService) {}
}
