import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public popup: boolean = false;

  public constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  signUp() {
    let email = (<HTMLInputElement>document.getElementById("Email")).value;
    let password = (<HTMLInputElement>document.getElementById("Password")).value;
    this.authenticationService.SignUp(email, password);
  }

  signIn() {
    let email = (<HTMLInputElement>document.getElementById("signInEmail")).value;
    let password = (<HTMLInputElement>document.getElementById("signInPassword")).value;
    this.authenticationService.SignIn(email, password);
  }

}
