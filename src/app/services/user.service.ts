import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { TweetService } from './tweet.service';
import { Tweet } from '../types/tweet.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;
  private userTweets: Tweet[];

  token = window.localStorage.getItem('token');

  httpOptions = {
    headers: { Authorization: `Bearer ${this.token}` },
  };

  constructor(private http: HttpClient, private tweetService: TweetService) {}

  setUser(user: User = null) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  tryToLogin() {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (!token) return;

    return this.http
      .get(`${env.usersApiURL}/me`, httpOptions)
      .subscribe((response: User) => {
        this.user = response;

        this.getDetails();
        this.fetchMyTweets();
      });
  }

  getDetails() {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    this.http
      .get(`${env.usersApiURL}/${this.user.id}`, httpOptions)
      .subscribe((response: any) => {
        if (response.profileImg) {
          this.user.profileImgUrl = `${env.baseApiURL}${response.profileImg.url}`;
        } else {
          this.user.profileImgUrl = 'assets/avatar-placeholder.png';
        }
      });
  }

  fetchMyTweets() {
    this.tweetService
      .fetchUserTweets(this.user.id)
      .subscribe((response) => (this.userTweets = response));
  }

  getmyTweets() {
    return this.userTweets;
  }

  saveImg(file) {
    const token = window.localStorage.getItem('token');
    const form = new FormData();

    form.append('files', file);
    // form.append('refId', this.user.id.toString());
    // form.append('ref', 'user');
    // form.append('field', 'profileImg');

    return this.http.post(env.uploadApiURL, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  editUser(userData) {
    const token = window.localStorage.getItem('token');
    return this.http.put(`${env.usersApiURL}/${this.user.id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
