import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private valService: ValidateService,
              private flashService: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if(this.authService.isLoggedin()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    if(!this.valService.validateRegister(user)) {
      this.flashService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.valService.validateEmail(user.email)) {
      this.flashService.show('Please enter a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.registerUser(user).subscribe(data=>{
      if(data.success) {
        this.flashService.show('You are registered successfully. Please login to continue', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashService.show('Something went wrong. Please try again', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
