import dummyData from '../data/dummy_songs.js'

let default_state = {
  is_fetching: false,
  invalidate: false,
  songs: dummyData
}

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

const songs = (state = default_state, action) => {
  switch(action.type) {
    case 'ADD_SONG':
      return [
        ...state,
        song(undefined, action)
      ]
    case 'ADD_VERSION':
      return Object.assign([], state.songs, state.songs.map((song) => {
        if(action.song_id === song.id) {
          return Object.assign({}, song, {
            versions: [
              ...song.versions,
              action.version
            ]
          })
        }
        return song
        })
      )
    case 'EDIT_VERSION':
      return Object.assign([], state.songs, state.songs.map((song) => {
        if(action.song_id === song.id) {
          return Object.assign({}, song, {
            versions: song.versions.map((version) => {
              if(action.version.id === version.id) {
                return action.version
              }
              return version
            })
          })
        }
        return song
        })
      )
    case 'REMOVE_VERSION':
      return Object.assign([], state.songs, state.songs.map((song) => {
        if(action.song_id === song.id) {
          return Object.assign({}, song, {
            versions: [
              ...song.versions.slice(0, action.version_id),
              ...song.versions.slice(action.version_id + 1) 
            ]
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
