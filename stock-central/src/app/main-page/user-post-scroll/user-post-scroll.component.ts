import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed-service.service';


@Component({
  selector: 'app-user-post-scroll',
  templateUrl: './user-post-scroll.component.html',
  styleUrls: ['./user-post-scroll.component.scss']
})
export class UserPostScrollComponent implements OnInit {

  products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  posts: any = []

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.feedService.setUserIDLocalStorage().subscribe((id: any) => {
      this.feedService.generateFeed(localStorage.getItem('userID')).subscribe((messages: any) => {
        for (let i = 0; i < messages.length; i++) {
          this.feedService.getUsernamesForFeed(messages[i].fk_user_id).subscribe((res: any) => {
            let username = res[0].username
            messages[i].username = username
            this.posts.push(messages[i])
          })
        }
        
        // for (let i = 0; i < messages.length; i++) {
        //   this.feedService.getUsernamesForFeed().subscribe((res) => {
        //   })
        // }
      })
    })
  }
  
}
