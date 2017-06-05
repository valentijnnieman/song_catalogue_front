import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import songs from './reducers/songs.js'

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
const store = createStore(
  songs,
  persistedState,
  applyMiddleware(
    thunkMiddleware
  )
)

export default store
