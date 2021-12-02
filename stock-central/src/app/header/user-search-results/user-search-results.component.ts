import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FriendsService } from 'src/app/services/friends.service';
import { SearchService } from 'src/app/services/search.service';
import { StockDataService } from 'src/app/services/stock-data.service';
import { WatchlistServiceService } from 'src/app/services/watchlist-service.service';

@Component({
  selector: 'app-user-search-results',
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.scss']
})
export class UserSearchResultsComponent implements OnInit {

  @Output() closePopupEvent = new EventEmitter();
  @Input() user = '';

  companyName = '';
  latestPrice = '';
  changeAmt = 0
  changePercent: number = 0
  public change: number = 0;
  friendsList: any = [];

  stockNewsImage1 = '';
  stockNewsHeadline1 = '';
  stockNewsURL1 = '';
  stockLogo = '';

  followButtonText = 'LOADING';

  constructor(public authenticationService: AuthenticationService, private stockDataService: StockDataService, private friendsService: FriendsService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.friendsService.getFriendsList(parseInt(<string>localStorage.getItem('userID'))).subscribe(res => {
      this.friendsList = res;
      for(let i = 0; i < this.friendsList.length; i++) {
        if (this.friendsList[i].fk_user_id_2 == JSON.parse(JSON.stringify(this.user)).user_id) {
          this.followButtonText = 'FOLLOWING'
          i = this.friendsList.length;
        }
      }
      if (this.followButtonText == 'LOADING') {
        this.followButtonText = 'FOLLOW'
      }
    });
    
  }

  closePopup() {
    this.closePopupEvent.emit();
  }

  followUser() {
    this.followButtonText = "LOADING"
    let userJSON = JSON.parse(JSON.stringify(this.user));
    let followObject = {
      "id": parseInt(<string>localStorage.getItem('userID')), 
      "id2": userJSON.user_id
    }
    this.friendsService.followUser(followObject).subscribe(res => {
      this.followButtonText = 'FOLLOWING';
    })
  }

  unfollowUser() {
    this.followButtonText = 'LOADING';
    let userJSON = JSON.parse(JSON.stringify(this.user));
    let followObject = {
      "id": parseInt(<string>localStorage.getItem('userID')), 
      "id2": userJSON.user_id
    }
    this.friendsService.unfollowUser(followObject).subscribe(res => {
      this.followButtonText = 'FOLLOW';
    })
  }

  getUsername() {
    let userJSON = JSON.parse(JSON.stringify(this.user))
    return userJSON.username;
  }

}
