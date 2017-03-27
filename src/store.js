import { createStore } from 'redux'
import songs from './reducers/songs.js'

let store = createStore(songs)

export default store
