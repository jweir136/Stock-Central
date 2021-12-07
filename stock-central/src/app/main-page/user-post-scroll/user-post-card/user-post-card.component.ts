import { parseHostBindings } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-user-post-card',
  templateUrl: './user-post-card.component.html',
  styleUrls: ['./user-post-card.component.scss']
})
export class UserPostCardComponent implements OnInit {

  @Input() post: any = '';
  @Input() likedPosts: any = '';

  message: string = '';
  username: string = '';
  showUser = false;
  user = '';
  numOfLikes = 0;
  liked = false;

  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.likedPosts.length; i++) {
      if (this.likedPosts[i] == this.post.post_id) {
        this.liked = true;
        i = this.likedPosts.length;
      }
    }
    this.message = this.post.message_content
    this.username = this.post.username
    this.user = this.post;
    this.numOfLikes = this.post.num_likes;
    let userJSON = JSON.parse(JSON.stringify(this.user));
    userJSON.user_id = userJSON.fk_user_id;
    this.user = JSON.stringify(userJSON);
  }

  showUserPage() {
    this.showUser = true;
  }

  likePost() {
    this.likeService.likePost(this.post.post_id, <string>localStorage.getItem('userID')).subscribe(res => {
      
    })
    this.liked = true;
    this.numOfLikes++;
  }

  unlikePost() {
    this.likeService.unlikePost(this.post.post_id, <string>localStorage.getItem('userID')).subscribe(res => {
    })
    this.liked = false;
    this.numOfLikes--;
  }

}
