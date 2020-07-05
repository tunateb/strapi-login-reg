import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;

  baseUrl = 'http://localhost:1337/users';

  constructor(private http: HttpClient) {}

  setUser(user: User = null) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  tryToLogin() {
    const token = window.localStorage.getItem('token');

    if (!token) return;

    return this.http
      .get(`${this.baseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe((response: User) => (this.user = response));
  }
}
