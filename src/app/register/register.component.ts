import { UserService } from './../user/user.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { number, object, string } from 'yup';
import * as yup from "yup";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css'],
})

export class RegisterComponent implements OnInit {
  user: User = {
    id: '',
    email: '',
    name: '',
    password: ''
  }
  confirmPassword: string = ''
  btnSubmit: string = ''
  hideBtnLogin: boolean = false
  id: string = ''
  userSchema = object({
    name: string().required().min(5),
    email: string().required().email(),
    password: string().required().min(6),
    confirmPassword: string().oneOf([yup.ref('password')], 'Passwords must match')
  })
  errorField: string = ''
  errorMessage: string = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.router.url.includes('register')) {
      this.btnSubmit = 'Register'
      this.hideBtnLogin = false
    }
    else {
      this.btnSubmit = 'Update'
      this.hideBtnLogin = true
      this.id = this.route.snapshot.paramMap.get('id') || ''

      this.userService.getUser(this.id)
        .then(user => {
          this.user = user
        })
    }
  }

  handleRegister() {
    this.userSchema.validate({
      ...this.user,
      confirmPassword: this.confirmPassword
    })
      .then(res => {
        this.errorField = ''
        this.errorMessage = ''
        this.userService.registerUser(this.user)
      })
      .catch(e => {
        this.errorField = e.path
        this.errorMessage = e.message
      })
  }

  handleUpdate(form: any) {
    if (form.invalid) {
      return
    }
    else {
      this.userService.updateUser(this.id, this.user)
    }
  }

}
