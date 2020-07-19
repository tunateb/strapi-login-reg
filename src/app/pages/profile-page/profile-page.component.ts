import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  selectedFile: File;

  fileURL: string | ArrayBuffer;

  constructor(
    private userService: UserService,
    private tweetService: TweetService
  ) {}

  ngOnInit(): void {
    this.userService.tryToLogin();
  }

  get user() {
    return this.userService.getUser();
  }

  get profileImg() {
    return this.user.profileImgUrl;
  }

  get myTweets() {
    return this.userService.getmyTweets();
  }

  selectFile(event) {
    if (event.target.files[0]) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        this.fileURL = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveImg() {
    this.userService.saveImg(this.selectedFile).subscribe((response) => {
      this.userService
        .editUser({ profileImg: response[0].id })
        .subscribe((response) => {
          this.selectedFile = null;
          this.userService.getDetails();
          this.userService.fetchMyTweets();
        });
    });
  }

  likeTweet(myLike, tweetId: number) {
    this.tweetService
      .toggleLike(myLike, tweetId, this.user.id)
      .subscribe((response) => this.userService.fetchMyTweets());
  }

  retweet() {
    console.log('dsads');
  }
}
