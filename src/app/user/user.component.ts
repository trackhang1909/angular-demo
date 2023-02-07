import { UserService } from './user.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs, doc, deleteDoc, query, startAt, limit, orderBy, endAt } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = []
  firstVisible: any = null
  lastVisible: any = null
  dbInstance = collection(this.firestore, 'users')

  constructor(private firestore: Firestore, private userService: UserService) { }

  ngOnInit(): void {
    this.initData()
  }

  nextPage() {
    const docRef = query(this.dbInstance, orderBy('name'), startAt(this.lastVisible), limit(10))
    this.getVisible(docRef)
    this.getUser(docRef)
  }

  previousPage() {
    const docRef = query(this.dbInstance, orderBy('name'), endAt(this.firstVisible), limit(10))
    this.getVisible(docRef)
    this.getUser(docRef)
  }

  async initData() {
    const docRef = query(this.dbInstance, orderBy('name'), limit(10));
    this.getVisible(docRef)
    this.getUser(docRef)
  }

  async getVisible(docRef: any) {
    const docSnap = await getDocs(docRef);
    this.firstVisible = docSnap.docs[0];
    this.lastVisible = docSnap.docs[docSnap.docs.length - 1];
  }

  getUser(docRef: any) {
    getDocs(docRef)
      .then((res: any) => {
        this.users = [
          ...res.docs.map((item: any) => {
            return {
              id: item.id,
              email: item.data()['email'],
              name: item.data()['name'],
              password: item.data()['password']
            }
          })
        ]
      })
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id)
    this.initData()
  }

}
