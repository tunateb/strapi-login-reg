import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  likeTweet(tweetId: number, userId: number) {
    const token = window.localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const newLike = {
      tweet: tweetId,
      user: userId,
    };

    return this.http.post(env.likeApiURL, newLike, headers);
  }

  dislikeTweet(likeId: number) {
    const token = window.localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.http.delete(`${env.likeApiURL}/${likeId}`, headers);
  }
}
