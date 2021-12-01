import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public getFullUserInfo(firstName: any) {
    return this.http.get(environment.API_BASE_URL + `/getUserByFirstName/${firstName}`)
  }
}
