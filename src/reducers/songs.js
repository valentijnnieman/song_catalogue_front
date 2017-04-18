import dummyData from '../data/dummy_songs.js'

let default_state = {
  is_fetching: false,
  invalidate: false,
  songs: []
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
    case 'REQUEST_SONGS':
      return { ...state, is_fetching: true, invalidate: false }
    case 'RECIEVE_SONGS':
      return { ...state, is_fetching: false, invalidate: false, songs: action.songs }
    case 'ADD_SONG':
      return {
        ...state,
        songs: [ ...state.songs, song(undefined, action) ]
      }
    case 'EDIT_SONG':
      return { 
        ...state,
        songs: state.songs.map((song) => {
          if(action.song_id === song.id) {
            return action.song
          }
          return song
        })
      }
    case 'REMOVE_SONG':
      return { ...state, songs: [ 
          ...state.songs.slice(0, action.song_id),
          ...state.songs.slice(action.song_id + 1)
        ]
      }
    case 'ADD_VERSION':
      return { ...state, songs: state.songs.map((song) => {
        if(action.song_id === song.id) {
          return { ...song, versions: [
              ...song.versions,
              action.version
            ]
          }
        }
        return song
        })
      }
    case 'EDIT_VERSION':
      return { ...state, songs: state.songs.map((song) => {
        if(action.song_id === song.id) {
          return { ...song, versions: song.versions.map((version) => {
              if(action.version.id === version.id) return action.version
              return version
            })
          }
        }
        return song
        })
      }
    case 'REMOVE_VERSION':
      return { ...state, songs: state.songs.map((song) => {
        if(action.song_id === song.id) {
          return { ...song, versions: [
              ...song.versions.slice(0, action.version_id),
              ...song.versions.slice(action.version_id + 1) 
            ]
          }
        }
        return song
        })
      }
    default:
      return state
  }
}

export default songs
