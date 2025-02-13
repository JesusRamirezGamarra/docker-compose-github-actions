import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://146.190.199.169/api/users'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  addUser(user: {firstName: string, lastName:string, age: number}) {
    return this.http.post(this.apiUrl, user);
  }
}
