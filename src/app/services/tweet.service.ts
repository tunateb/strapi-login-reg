import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tweet } from '../types/tweet.type';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  baseUrl = 'http://localhost:1337/tweets';

  private tweets: Tweet[];

  constructor(private http: HttpClient, private userService: UserService) {}

  fetchTweets(): void {
    this.http
      .get(`${this.baseUrl}?_sort=created_at:DESC`)
      .subscribe((response: Tweet[]) => (this.tweets = response));
  }

  getTweets(): Tweet[] {
    return this.tweets;
  }

  fetchTweet(tweetId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tweetId}`);
  }

  postTweet(text: string) {
    const newTweet: Tweet = {
      text: text,
      user: this.userService.getUser(),
    };

    const token = window.localStorage.getItem('token');

    return this.http.post(this.baseUrl, newTweet, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
