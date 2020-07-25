import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthResponse } from '../../types/authResponse.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isLoading: boolean = false;

  loginForm = new FormGroup({
    identifier: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    password: new FormControl('', Validators.required),
  });

  // form = {
  //   identifier: '',
  //   password: '',
  // };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // login() {
  //   this.isLoading = true;

  //   this.authService.login(this.form).subscribe((response: AuthResponse) => {
  //     this.authService.setToken(response.jwt);
  //     this.userService.setUser(response.user);
  //     this.userService.getDetails();

  //     this.isLoading = false;

  //     this.form = {
  //       identifier: '',
  //       password: '',
  //     };

  //     this.router.navigateByUrl('/');
  //   });
  // }

  get identifierErrors() {
    return this.loginForm.controls.identifier.errors;
  }

  login() {
    console.log(this.loginForm);
  }
}
