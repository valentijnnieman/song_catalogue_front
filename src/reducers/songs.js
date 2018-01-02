import dummyData from '../data/dummy_songs.js'

let default_state = {
  is_fetching: false,
  is_authenticating: false,
  invalidate: false,
  token: null,
  authenticated: false,
  message: null,
  songs: [{}]
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
    case 'REQUEST_LOGIN' :
      return { ...state, is_authenticating: true, authenticated: false }
    case 'RECIEVE_LOGIN' :
      return { ...state, is_authenticating: false, authenticated: true, token: action.token }
    case 'FAILED_LOGIN' :
      return { ...state, is_authenticating: false, authenticated: false, message: action.message }
    case 'REQUEST_SONGS':
      return { ...state, is_fetching: true, invalidate: false }
    case 'RECIEVE_SONGS':
      return { ...state, is_fetching: false, invalidate: false, songs: action.songs }
    case 'ADD_SONG':
      return {
        ...state,
        songs: [ ...state.songs, action.song ]
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
      return { ...state, songs: state.songs.map((song, index) => {
        if(action.song_index === index) {
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
      return { ...state, songs: state.songs.map((song, index) => {
        if(action.song_index === index) {
          return { ...song, versions: song.versions.map((version, index) => {
              if(action.version_index === index) return action.version
              return version
            })
          }
        }
        return song
        })
      }
    case 'REMOVE_VERSION':
      return { ...state, songs: state.songs.map((song, index) => {
        if(action.song_index === index) {
          return { ...song, versions: [
              ...song.versions.slice(0, action.version_index),
              ...song.versions.slice(action.version_index + 1) 
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
