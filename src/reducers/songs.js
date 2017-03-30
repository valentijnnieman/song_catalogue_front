import dummyData from '../data/dummy_songs.js'

const song = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_SONG':
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
      return [
        ...state,
        song(undefined, action)
      ]
    case 'EDIT_VERSION':
      return Object.assign([], state, state.map((song) => {
        if(action.song_id === song.id) {
          Object.assign(song, {
            versions: song.versions.map((version) => {
              if(action.version_id === version.id) {
                return action.version
              }
              return version
            })
          })
        }
        return song
        })
      )
    default:
      return state
  }
}

export default songs
