export interface PostUser {
  id: string
  username: string
  avatar: string
}

export interface Post {
  caption?: string
  images: string[]
  user: PostUser
}
