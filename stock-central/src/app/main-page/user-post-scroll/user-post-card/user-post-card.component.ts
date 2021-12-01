import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-post-card',
  templateUrl: './user-post-card.component.html',
  styleUrls: ['./user-post-card.component.scss']
})
export class UserPostCardComponent implements OnInit {
  @Input() posts = [];

  constructor() { }

  ngOnInit(): void {
  }

}
