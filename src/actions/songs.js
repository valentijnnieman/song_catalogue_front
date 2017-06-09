import fetch from 'isomorphic-fetch'
import store from '../store.js';

let next_id = 2
// TO-DO: get correct id --^
//

export function fetchSongs(token) {
  return function (dispatch) {
    console.log('fetchSongs!')
    dispatch(requestSongs())

    return fetch('https://song-catalogue-api.herokuapp.com/auth/artist/1', {
    //return fetch('http://localhost:8080/auth/artist/1', {
        headers: {
          'Authorization': 'Bearer ' + token, 
          'Content-Type': 'application/json'
        }, 
      })
      .then(response => {
        console.log("response", response)
        return response.json()
      })
      .then(json => { 
        console.log("json", json)
        // eep!
        store.dispatch(recieveSongs(json.artist.songs))
      })
  }
}

export function fetchLogin(username, password) {
  return function (dispatch) {
    dispatch(requestLogin())

    return fetch('https://song-catalogue-api.herokuapp.com/login', {
    //return fetch('http://localhost:8080/login', {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password 
        })
      })
      .then(response => {
        console.log("response", response)
        if(response.ok) {
          response.json()
          .then(json => { 
            console.log("json", json)
            // eep!
            store.dispatch(recieveLogin(json.token))
            store.dispatch(fetchSongs(json.token))
          })
        }
        else { 
          console.log("can't log in!")  
          store.dispatch(failedLogin("Incorrect username or password"))
        }
      })
  }
}
export const requestLogin= () => {
  return { 
    type: 'REQUEST_LOGIN'
  }
}

export const recieveLogin = (token) => {
  console.log(token)
  return {
    type: 'RECIEVE_LOGIN',
    token: token
  }
}
export const failedLogin= (message) => {
  return {
    type: 'FAILED_LOGIN',
    message: message
  }
}
export const requestSongs = () => {
  return { 
    type: 'REQUEST_SONGS'
  }
}

export const recieveSongs = (songs) => {
  console.log(songs)
  return {
    type: 'RECIEVE_SONGS',
    songs: songs
  }
}
export const addSong = (title) => {
  return {
    type: 'ADD_SONG',
    id: next_id++,
    title,
    versions: [{ 
      "id": 0,
      "title": "Version #1 (new)",
      "created_at": "14 march, 2017",
      "recording": "file.mp3",
      "notes": "Add notes here",
      "lyrics": "Add lyrics here"
    }]
  }
}
export const editSong = (song, song_id) => {
  return {
    type: 'EDIT_SONG',
    song: song,
    song_id: song_id
  }
}

export const removeSong = (song_id) => {
  console.log("removing song: ", song_id)
  return {
    type: 'REMOVE_SONG',
    song_id: song_id
  }
}
