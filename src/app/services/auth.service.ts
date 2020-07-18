import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  register(registerData) {
    return this.http.post(`${env.authApiURL}/local/register`, registerData);
  }

  login(loginData) {
    return this.http.post(`${env.authApiURL}/local`, loginData);
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
