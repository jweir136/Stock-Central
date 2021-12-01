import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed-service.service';


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
    let email = localStorage.getItem('email')
    this.feedService.setUserIDLocalStorage(email).subscribe((id: any) => {
      // console.log(id)
      localStorage.setItem('userID', id[0].user_id)
      this.feedService.generateFeed(id[0].user_id).subscribe((messages: any) => {
        console.log(messages)
        // for (let i = 0; i < messages.length; i++) {
        //   this.feedService.getUsernamesForFeed().subscribe((res) => {
            
        //   })
        // }
      })
    })
  }

}
