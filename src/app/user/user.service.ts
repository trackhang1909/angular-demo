import { query } from '@firebase/firestore';
import { User } from './../user';
import { collection, addDoc, Firestore, doc, getDoc, updateDoc, where, getDocs, deleteDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  dbInstance = collection(this.firestore, 'users')

  constructor(private firestore: Firestore, private router: Router) { }

  async checkUser(user: User) {
    const q = query(this.dbInstance, where('email', '==', user.email))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.size > 0) {
      const qEmail = querySnapshot.docs[0].data()['email']
      const qPassword = querySnapshot.docs[0].data()['password']
      if (qEmail == user.email && qPassword == user.password) {
        this.router.navigate(['user'])
        return
      }
    }

    alert('Login failed')
  }

  registerUser(user: User) {
    addDoc(this.dbInstance, {
      name: user.name,
      email: user.email,
      password: user.password
    })
      .then(() => {
        alert('Register succeed')
      })
      .catch(error => {
        alert('Register failed')
      })
  }

  updateUser(id: string, user: User) {
    let docRef = doc(this.dbInstance, id)
    updateDoc(docRef, {
      email: user.email,
      name: user.name,
      password: user.password
    })
      .then(() => {
        this.router.navigate(['user'])
      })
      .catch(error => {
        alert('Update failed')
      })
  }

  async getUser(id: string): Promise<User> {
    let docRef = doc(this.dbInstance, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: id,
        email: docSnap.data()['email'],
        name: docSnap.data()['name'],
        password: ''
      }
    } else {
      console.log("No such document!");
      return {
        id: '',
        email: '',
        name: '',
        password: ''
      }
    }
  }

  deleteUser(id: string) {
    let docRef = doc(this.dbInstance, id)
    deleteDoc(docRef)
      .then(() => {
        alert('Delete succeed')
      })
      .catch(error => {
        alert('Delete failed')
      })
  }
}
