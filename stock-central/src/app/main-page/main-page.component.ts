import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed-service.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private feedService: FeedService) { }



  ngOnInit(): void {
    this.feedService.setUserIDLocalStorage().subscribe((res: any) => {
      console.log(res)
      sessionStorage.setItem('userID', res[0].user_id)
      console.log(res[0].user_id)
    })

  }

}
