import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

import { Profile } from '../profile';
import { Observable } from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ProfileService {

  private apiUrl = 'http://localhost:3000/api/';

  

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.info(`ProfileService: ${message}`);
  }

  getProfiles() {
    return this.http.get<Profile[]>(`${this.apiUrl}profiles`);
      
  }

  getProfile() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let id = currentUser.userId;
    return this.http.get<Profile>(`${this.apiUrl}Users/${id}`);
  }



}
