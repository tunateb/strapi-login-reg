import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/services/tweet.service';
import { Tweet } from 'src/app/types/tweet.type';
import { UserService } from 'src/app/services/user.service';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  text: string = '';
  fileList: File[];
  imgList = [];
  isFormLoading: boolean = false;

  constructor(
    private tweetService: TweetService,
    private userService: UserService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.tweetService.fetchTweets();
  }

  get user() {
    return this.userService.getUser();
  }

  get tweets() {
    return this.tweetService.getTweets();
  }

  postTweet() {
    this.isFormLoading = true;

    if (!(this.fileList && this.fileList.length)) {
      this.tweetService
        .postTweet(this.text, this.user)
        .subscribe((response) => {
          this.text = '';
          this.isFormLoading = false;
          this.fileList = null;
          this.imgList = null;
          this.tweetService.fetchTweets();
        });
    } else {
      this.tweetService
        .uploadImages(this.fileList)
        .subscribe((response: any[]) => {
          const uploadedFileIds = response.map((file) => file.id);
          this.tweetService
            .postTweet(this.text, this.user, uploadedFileIds)
            .subscribe((response) => {
              console.log(response);
              this.text = '';
              this.isFormLoading = false;
              this.fileList = null;
              this.imgList = null;
              this.tweetService.fetchTweets();
            });
        });
    }
  }

  selectFiles(event) {
    if (this.imgList.length) {
      this.imgList = [];
    }

    this.fileList = Array.from(event.target.files);

    this.fileList.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => this.imgList.push(e.target.result);

      reader.readAsDataURL(file);
    });
  }

  selectMoreFiles(event) {
    this.imgList = [];
    const newFileList = Array.from(event.target.files);
    // console.log(newFileList)
    // console.log(this.fileList)

    newFileList.forEach((file: File) => {
      this.fileList.push(file);
    });
    this.fileList.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => this.imgList.push(e.target.result);

      reader.readAsDataURL(file);
    });
  }

  likeTweet(myLike, tweetId: number) {
    this.tweetService
      .toggleLike(myLike, tweetId, this.user.id)
      .subscribe((response) =>
        this.tweetService
          .fetchTweet(tweetId)
          .subscribe((response) => this.tweetService.setTweet(response))
      );
  }

  retweet(myRetweet, tweetId: number) {
    this.tweetService
      .toggleRetweet(myRetweet, tweetId, this.user.id)
      .subscribe((response) => {
        this.tweetService.fetchTweet(tweetId)
        .subscribe((response) => this.tweetService.setTweet(response))
      });
  }
}
