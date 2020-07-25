import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RetweetService {
  constructor(private http: HttpClient) {}

  retweet(tweetId: number, userId: number) {
    const token = window.localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const newRetweet = {
      tweet: tweetId,
      user: userId
    }

    return this.http.post(env.retweetApiURL, newRetweet, headers);
  }

  removeRetweet(retweetId: number) {
    const token = window.localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.http.delete(`${env.retweetApiURL}/${retweetId}`, headers);
  }

  retweetComment(commentId:number, userId:number) {
    const token = window.localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const newRetweet = {
      comment: commentId,
      user: userId,
    };

    return this.http.post(env.retweetApiURL, newRetweet, headers);
  }
}
