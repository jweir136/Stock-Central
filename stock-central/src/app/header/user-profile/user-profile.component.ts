import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Output() openUserPreferenceEditor = new EventEmitter();

  public popup: boolean = false;
  public accountCreated: string = '';
  public userName: string = '';
  public userFirstName: string = '';
  public userPhotoUrl: string = '';
  public editBio: boolean = false;
  public bioForm: FormGroup = FormGroup.prototype;

  public constructor(public authenticationService: AuthenticationService) {
    this.authenticationService.authenticationEvent.subscribe((user: boolean) => {
    });
  }

  public ngOnInit(): void {
    this.userName = <string>localStorage.getItem('username')?.replace(/['"]+/g, ''),
    this.userFirstName = <string>localStorage.getItem('username')?.replace(/['"]+/g, ''),
    this.userPhotoUrl = this.authenticationService.getUserPhotoUrl();
  }
}
