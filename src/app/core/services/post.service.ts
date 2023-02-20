import { Firestore, collection, collectionData, doc, getDoc, collectionChanges } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private firestore: Firestore) { }

  getPosts() {
    const clt: any = collection(this.firestore, 'posts')
    return collectionData<Post>(clt, {
      idField: 'id'
    })
  }

  async getPostById(id: string) {
    const clt: any = doc(collection(this.firestore, 'posts'), id)
    const docSnap = await getDoc(clt)

    if (docSnap.exists()) {
      const temp: any = docSnap.data()

      return {
        id: id,
        user: {
          id: temp.user.id,
          avatar: temp.user.avatar,
          username: temp.user.username
        },
        images: temp.images
      } as Post
    }

    return {
      id: id,
      user: {
        id: '',
        avatar: '',
        username: ''
      },
      images: []
    } as Post
  }
}
