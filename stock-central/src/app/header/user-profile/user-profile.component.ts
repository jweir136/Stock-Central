import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import * as moment from 'moment';


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
  public username: string = '';
  public age: number = -1;
  public createdAt: string = '';
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
    
    this.profileService.getFullUserInfo(this.userFirstName).subscribe((res: any) => {
      this.username = res[0].username
      this.age = res[0].age
      this.createdAt = moment(res[0].created_at).format('MM/DD/YYYY')
    })
  }
}
