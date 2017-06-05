import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import songs from './reducers/songs.js'

const persistedState = localStorage.getItem('song_catalogue') ? JSON.parse(localStorage.getItem('song_catalogue')) : {}
const store = createStore(
  songs,
  persistedState,
  applyMiddleware(
    thunkMiddleware
  )
)

export default store
