import { Post } from './../../models/post.model';
import { PostState } from './post.state';
import * as postActions from './post.actions'

const initialState: PostState = {
  items: [],
  currentItem: null,
  status: 'idle',
  error: ''
}

export function postReducer(
  state: PostState = initialState,
  action: postActions.PostActions
): PostState {
  switch (action.type) {
    case postActions.GET_POSTS:
      return {...state, status: 'loading'}
    case postActions.GET_POSTS_SUCCESS:
      return {...state, status: 'idle', items: action.posts, error: ''}
    case postActions.GET_POSTS_FAILED:
      return {...state, status: 'error', items: [], error: action.error}
    case postActions.GET_POST:
      return {...state, status: 'loading'}
    case postActions.GET_POST_SUCCESS:
      return {...state, status: 'idle', currentItem: action.item}
    case postActions.GET_POST_FAILED:
      return {...state, status: 'error', currentItem: null, error: action.error}
    case postActions.CREATE_POST:
    case postActions.UPDATE_POST:
    default:
      return state
  }
}
