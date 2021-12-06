import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  likePost(postID: string, userID: string) {
    console.log('whats bad');
    this.http.patch(environment.API_BASE_URL + '/likePost/' + postID + '/' + userID, JSON.parse('{}')).subscribe(res => {
      console.log(res);
    })
  }
}
