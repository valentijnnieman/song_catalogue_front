import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import songs from './reducers/songs.js'

const store = createStore(
  songs,
  applyMiddleware(
    thunkMiddleware
  )
)

export default store
