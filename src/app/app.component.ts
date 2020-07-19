import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { TweetService } from './services/tweet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tweetService:TweetService
  ) {}

  ngOnInit() {
    this.userService.tryToLogin();
    this.tweetService.fetchTweets();
  }

  get user() {
    return this.userService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
