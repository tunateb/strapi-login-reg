import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:1337/auth';
  // jwt: string;

  constructor(private http: HttpClient, private userService: UserService) {}

  register(registerData) {
    return this.http.post(`${this.baseUrl}/local/register`, registerData);
  }

  login(loginData) {
    return this.http.post(`${this.baseUrl}/local`, loginData);
  }

  logout() {
    // this.jwt = '';
    window.localStorage.removeItem('token');
    this.userService.setUser();
  }

  setToken(token: string) {
    // this.jwt = token;
    window.localStorage.setItem('token', token);
  }
}
