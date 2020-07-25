import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-user-list-menu',
  templateUrl: './user-list-menu.component.html',
  styleUrls: ['./user-list-menu.component.scss'],
})
export class UserListMenuComponent implements OnInit {
  constructor(
    private userService: UserService,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    this.userService.fetchUsers();
  }

  get users() {
    return this.userService.getUsers();
  }

  get user() {
    return this.userService.getUser();
  }

  get myFollows() {
    return this.userService.getMyFollows();
  }

  replaceWithDefaultImg(event) {
    event.target.error = null;
    event.target.src = 'assets/avatar-placeholder.png';
  }

  toggleFollow(followedUserId: number) {
    const follow = this.user.follows.find(
      (follow) => follow.followingUser === followedUserId
    );
    if (follow) {
      this.followService.unfollowUser(follow.id).subscribe((response) => {
        this.userService.getDetails();
      });
    } else {
      this.followService
        .followUser(followedUserId, this.user.id)
        .subscribe((response) => {
          this.userService.getDetails()
        });
    }
  }
}
