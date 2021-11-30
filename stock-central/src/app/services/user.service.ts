import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async addUser(user: any) {
    let newUser = {
      "username": localStorage.getItem('username')?.replace(/['"]+/g, ''),
      "firstName": localStorage.getItem('firstName')?.replace(/['"]+/g, ''),
      "lastName": localStorage.getItem('lastName')?.replace(/['"]+/g, ''),
      "age": 0,
      "email": user.email
    }
    return this.http.post<any>('http://localhost:3000/api/users', newUser).subscribe(data => {
      console.log(data);
    })
  }
}
