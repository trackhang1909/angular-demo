import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { collection, addDoc, Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css']
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

  constructor(private firestore: Firestore, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    if (this.router.url.includes('register')) {
      this.btnSubmit = 'Register'
      this.hideBtnLogin = false
    }
    else {
      this.btnSubmit = 'Update'
      this.hideBtnLogin = true
      this.id = this.route.snapshot.paramMap.get('id') || ''

      let docRef = doc(this.firestore, 'users', this.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        this.user = {
          id: this.id,
          email: docSnap.data()['email'],
          name: docSnap.data()['name'],
          password: ''
        }
      } else {
        console.log("No such document!");
      }
    }
  }

  handleRegister(form: any) {
    if (form.invalid) {
      return
    }
    else {
      const dbInstance = collection(this.firestore, 'users')
      addDoc(dbInstance, {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          alert('Register succeed')
        })
        .catch(error => {
          alert('Register failed')
        })
    }
  }

  handleUpdate() {
    let docRef = doc(this.firestore, 'users', this.id)
    updateDoc(docRef, {
      email: this.user.email,
      name: this.user.name,
      password: this.user.password
    })
      .then(() => {
        this.router.navigate(['user'])
      })
      .catch(error => {
        alert('Update failed')
      })
  }

}
