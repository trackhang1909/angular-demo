import { UserService } from './../user/user.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { number, object, string } from 'yup';

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
  userSchema = object({
    email: string().required().email(),
    password: string().required().min(6),
  })
  errorField: string = ''
  errorMessage: string = ''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.userSchema.validate(this.user)
      .then(res => {
        this.errorField = ''
        this.errorMessage = ''
        this.userService.checkUser(this.user)
      })
      .catch(e => {
        this.errorField = e.path
        this.errorMessage = e.message
      })
  }

}
