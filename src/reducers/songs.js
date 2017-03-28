import dummyData from '../data/dummy_songs.js'

const song = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_SONG':
      console.log(action)
      return {
        id: action.id,
        title: action.title,
        versions: action.versions
      }
  }
}

const songs = (state = dummyData, action) => {
  switch(action.type) {
    case 'ADD_SONG':
      console.log(action)
      console.log(state)
      return [
        ...state,
        song(undefined, action)
      ]
    default:
      return state
  }
}

export default songs
