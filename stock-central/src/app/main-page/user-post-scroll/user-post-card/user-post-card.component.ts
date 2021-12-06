import { parseHostBindings } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-post-card',
  templateUrl: './user-post-card.component.html',
  styleUrls: ['./user-post-card.component.scss']
})
export class UserPostCardComponent implements OnInit {

  @Input() post: any = '';

  message: string = '';
  username: string = '';
  showUser = false;
  user = '';

  constructor() { }

  ngOnInit(): void {
    this.message = this.post.message_content
    this.username = this.post.username
    this.user = this.post;
    let userJSON = JSON.parse(JSON.stringify(this.user));
    userJSON.user_id = userJSON.fk_user_id;
    this.user = JSON.stringify(userJSON);
  }

  showUserPage() {
    console.log('check this out');
    this.showUser = true;
  }

}
