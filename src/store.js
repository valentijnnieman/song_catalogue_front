import { createStore } from 'redux'
import dummyData from './data/dummy_songs.js'

const songs = (state = {songs: dummyData}, action) => {
  return state
}

let store = createStore(songs)

export default store
