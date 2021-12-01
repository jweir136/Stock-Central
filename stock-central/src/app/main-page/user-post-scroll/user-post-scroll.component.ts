import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed-service.service';

// let posts = []


@Component({
  selector: 'app-user-post-scroll',
  templateUrl: './user-post-scroll.component.html',
  styleUrls: ['./user-post-scroll.component.scss']
})
export class UserPostScrollComponent implements OnInit {

  products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  posts = []

  constructor(private feedService: FeedService) { }
  ngOnInit(): void {
    // this.feedService.setUserIDLocalStorage
    console.log(sessionStorage.getItem('userID'))
    this.feedService.generateFeed(1).subscribe((messages: any) => {
      console.log(messages)
      // for (let i = 0; i < messages.length; i++) {
      //   posts.push(messages[i])
      // }
      // for (let i = 0; i < messages.length; i++) {
      //   userID = -1
      //   console.log(messages[i])
      //   this.feedService.getUsernamesForFeed(userID).subscribe((res: any) => {
      //     let username = res['username']
      //     messages[i].username = username
      //   })
      //   feedContents.push(messages[i])
      // }
    })
  }

}
