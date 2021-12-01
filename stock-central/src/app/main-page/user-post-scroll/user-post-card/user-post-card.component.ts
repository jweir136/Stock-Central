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

  constructor() { }

  ngOnInit(): void {
    this.message = this.post.message_content
    this.username = this.post.username
  }

}
