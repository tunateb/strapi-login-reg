import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tweet } from 'src/app/types/tweet.type';
import { Comment } from '../../types/comment.type';
import { environment as env } from '../../../environments/environment';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss'],
})
export class TweetCardComponent implements OnInit {
  @Input() tweet: Tweet;
  @Input() comment: Comment;
  @Input() me: User;
  @Output() onLike = new EventEmitter();
  @Output() onCommentLike = new EventEmitter();
  @Output() onRetweet = new EventEmitter();
  @Output() onCommentRetweet = new EventEmitter();

  avatarImg: string = 'assets/avatar-placeholder.png';

  constructor() {}

  ngOnInit(): void {
    // console.log(this.comment);
  }

  get profileImg() {
    if (this.comment) {
      return this.comment.user.profileImg
        ? `${env.baseApiURL}${this.comment.user.profileImg.url}`
        : this.avatarImg;
    } else {
      return this.tweet.user.profileImg
        ? `${env.baseApiURL}${this.tweet.user.profileImg.url}`
        : this.avatarImg;
    }
  }

  get likedByMe() {
    if (this.me) {
      return this.tweet.likes.find((like) => like.user === this.me.id);
    }
  }

  get retweetedByMe() {
    if (this.me) {
      return this.tweet.retweets.find((retweet) => retweet.user === this.me.id);
    }
  }

  get commentLikedByMe() {
    if (this.me) {
      return this.comment.likes.find((like) => like.user === this.me.id);
    }
  }

  get commentRetweetedByMe() {
    if (this.me) {
      return this.comment.retweets.find(
        (retweet) => retweet.user === this.me.id
      );
    }
  }
}
