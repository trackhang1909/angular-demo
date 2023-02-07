import { UserService } from './../user/user.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})

export class LoginComponent implements OnInit {
  user: User = {
    id: '',
    email: '',
    name: '',
    password: ''
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  async handleLogin(form: any) {
    if (form.invalid) {
      return
    }
    else {
      this.userService.checkUser(this.user)
    }
  }

}
