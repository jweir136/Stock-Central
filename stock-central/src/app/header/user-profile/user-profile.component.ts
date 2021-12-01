import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';

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
  public userLastName: string = '';
  public userPhotoUrl: string = '';
  public editBio: boolean = false;
  public bioForm: FormGroup = FormGroup.prototype;

  public constructor(public authenticationService: AuthenticationService, private profileService: ProfileService) {
    this.authenticationService.authenticationEvent.subscribe((user: boolean) => {
    });
  }

  public ngOnInit(): void {
    this.userName = <string>localStorage.getItem('username')?.replace(/['"]+/g, ''),
      this.userFirstName = <string>localStorage.getItem('username')?.replace(/['"]+/g, '').split(' ')[0],
      this.userLastName = <string>localStorage.getItem('username')?.replace(/['"]+/g, '').split(' ')[0],
      this.userPhotoUrl = this.authenticationService.getUserPhotoUrl();
    
    this.profileService.getFullUserInfo(this.userFirstName).subscribe((res) => {
      console.log(res)
    })
  }
}
