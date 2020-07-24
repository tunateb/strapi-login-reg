import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment as env } from '../../environments/environment';
import { LikeService } from './like.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private likeService: LikeService
  ) {}

  fetchComments(tweetId: number): Observable<any> {
    return this.http.get(
      `${env.commentsApiURL}?tweet=${tweetId}&&_sort=created_at:DESC`
    );
  }

  fetchComment(commentId: number): Observable<any> {
    return this.http.get(`${env.commentsApiURL}/${commentId}`);
  }

  postComment(text: string, tweetId: number) {
    const token = window.localStorage.getItem('token');

    const newComment = {
      text: text,
      user: this.userService.getUser().id,
      tweet: tweetId,
    };

    return this.http.post(env.commentsApiURL, newComment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  toggleLike(myLike, commentId, userId) {
    if (myLike) {
      return this.likeService.dislikeTweet(myLike.id);
    } else {
      return this.likeService.likeComment(commentId, userId);
    }
  }
}
