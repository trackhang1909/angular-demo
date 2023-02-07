import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, where } from '@angular/fire/firestore';
import { query } from '@firebase/firestore';
import { Router } from '@angular/router';

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

  constructor(private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {
  }

  async handleLogin(form: any) {
    if (form.invalid) {
      return
    }
    else {
      const dbInstance = collection(this.firestore, 'users')
      const q = query(dbInstance, where('email', '==', this.user.email))

      const querySnapshot = await getDocs(q)

      if (querySnapshot.size > 0) {
        const qEmail = querySnapshot.docs[0].data()['email']
        const qPassword = querySnapshot.docs[0].data()['password']
        if (qEmail == this.user.email && qPassword == this.user.password) {
          this.router.navigate(['user'])
          return
        }
      }

      alert('Login failed')

    }
  }

}
