import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public getFullUserInfo(email: any) { 
    return this.http.get('http://localhost:3000/api/getUserByEmail/' + email)
  }
}
