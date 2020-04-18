import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private flashService: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if(this.authService.isLoggedin()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data=>{
      if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashService.show('You have logged in succesfully', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashService.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    })
  }
}
