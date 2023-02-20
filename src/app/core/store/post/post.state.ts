import { Post } from './../../models/post.model';

export interface PostState {
  items: Post[]
  status: 'idle' | 'loading' | 'loaded' | 'error'
  error?: string,
  currentItem: Post | null
}
