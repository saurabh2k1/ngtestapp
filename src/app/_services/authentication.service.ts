import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/Users/login`, {username, password})
      .pipe(map(user => {
        if (user && user.id) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  register(username: string, email: string, password: string) {
    let test: string = 'test'; let verifiedEmail: boolean = true;
    return this.http.post<any>(`${this.apiUrl}Users`, {test, username, email, password, verifiedEmail })
    .pipe(map(user => {
      return user;
    }));
  }

}
