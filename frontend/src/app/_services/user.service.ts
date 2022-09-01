import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  // Получить всех пользователей
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'users');
  }

  //
  sendMail(user: any): void {
    this.http.post('http://localhost:8080/sendMail', user).subscribe(
      data => {
        let res:any = data;
        console.log(
          "Succesfull register!!" + user.name + ". " + res.messages
        )
      },
      err => {
        console.log(err);
      }
    );;
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
