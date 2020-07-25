import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(private http: HttpClient) {}

  followUser(followedUser: number, userId: number) {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const followData = {
      user: userId,
      followingUser: followedUser,
    };
    return this.http.post(env.followApiURL, followData, httpOptions);
  }

  unfollowUser(followId: number) {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return this.http.delete(`${env.followApiURL}/${followId}`, httpOptions);
  }
}
