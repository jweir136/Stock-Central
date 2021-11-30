import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  public popup: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  uploadPost() {
    console.log('This is where the post would be uploaded');
  }

}
