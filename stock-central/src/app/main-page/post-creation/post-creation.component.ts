import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  public popup: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  uploadPost() {
    let userID: any = sessionStorage.getItem('userID')
    let messageContent = ''
    this.postService.createPost(userID, messageContent).subscribe((res: any) => {
      console.log(res) 
    })
    console.log('This is where the post would be uploaded');
  }

}
