import { UserService } from './../user/user.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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

  handleRegister(form: any) {
    if (form.invalid) {
      return
    }
    else {
      this.userService.registerUser(this.user)
    }
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
