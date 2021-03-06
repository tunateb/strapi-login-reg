import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tweet } from '../types/tweet.type';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';
import { User } from '../types/user.type';
import { LikeService } from './like.service';
import { RetweetService } from './retweet.service';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  private tweets: Tweet[];

  constructor(
    private http: HttpClient,
    private likeService: LikeService,
    private retweetService: RetweetService
  ) {}

  fetchTweets(): void {
    this.http
      .get(`${`${env.tweetsApiURL}`}?_sort=created_at:DESC`)
      .subscribe((response: Tweet[]) => (this.tweets = response));
  }

  fetchUserTweets(id: number): Observable<any> {
    return this.http.get(
      `${env.tweetsApiURL}/?user=${id}&&_sort=created_at:DESC`
    );
  }

  getTweets(): Tweet[] {
    return this.tweets;
  }

  fetchTweet(tweetId: number): Observable<any> {
    return this.http.get(`${env.tweetsApiURL}/${tweetId}`);
  }

  setTweet(updatedTweet) {
    const tweetIndex = this.tweets.findIndex((t) => t.id === updatedTweet.id);
    this.tweets.splice(tweetIndex, 1, updatedTweet);
  }

  uploadImages(fileList) {
    const token = window.localStorage.getItem('token');
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('files', file);
    });

    return this.http.post(env.uploadApiURL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  postTweet(text: string, user: User, fileList: number[] = []) {
    const token = window.localStorage.getItem('token');

    const newTweet: Tweet = {
      text: text,
      user: user,
      image: fileList,
    };

    return this.http.post(`${env.tweetsApiURL}`, newTweet, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  toggleLike(myLike, tweetId, userId) {
    if (myLike) {
      return this.likeService.dislikeTweet(myLike.id);
    } else {
      return this.likeService.likeTweet(tweetId, userId);
    }
  }

  toggleRetweet(myRetweet, tweetId, userId) {
    if (myRetweet) {
      return this.retweetService.removeRetweet(myRetweet.id);
    } else {
      return this.retweetService.retweet(tweetId, userId)
    }
  }
}
