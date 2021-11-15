import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-post-scroll',
  templateUrl: './user-post-scroll.component.html',
  styleUrls: ['./user-post-scroll.component.scss']
})
export class UserPostScrollComponent implements OnInit {

  products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  constructor() { }

  ngOnInit(): void {
  }

}
