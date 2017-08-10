import fetch from 'isomorphic-fetch'
import store from '../store.js';

let next_id = 2
// TO-DO: get correct id --^
//

export function createSong(token, title) {
  return function (dispatch) {
    return fetch(`http://localhost:8080/auth/song/create`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        versions: []
      }),
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(json => { 
          console.log("hey! listen! ", json.song)
          store.dispatch(addSong(json.song))
        })
      }
      else { 
        console.log("ERROR! Couldn't create song!")  
      }
    })
  }
}
export function deleteSong(token, song_index, song_id) {
  return function (dispatch) {
    console.log("HEARD", token)
    return fetch(`http://localhost:8080/auth/song/${song_id}/delete`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(json => { 
          store.dispatch(removeSong(song_index))
        })
      }
      else { 
        console.log("ERROR! Couldn't delete song!")  
      }
    })
  }
}
export function fetchLogin(username, password) {
  return function (dispatch) {
    dispatch(requestLogin())

    //return fetch('https://song-catalogue-api.herokuapp.com/login', {
    return fetch('http://localhost:8080/login', {
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
            console.log("login returns this json: ", json)
            // eep!
            store.dispatch(recieveLogin(json.token))
            store.dispatch(fetchSongs(json.token, 1))
          })
        }
        else { 
          console.log("can't log in!")  
          store.dispatch(failedLogin("Incorrect username or password"))
        }
      })
  }
}
export function fetchSongs(token) {
  return function (dispatch) {
    dispatch(requestSongs())

    //return fetch('https://song-catalogue-api.herokuapp.com/auth/artist/1', {
    return fetch(`http://localhost:8080/auth/songs`, {
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
        store.dispatch(recieveSongs(json.songs))
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
export const addSong = (song) => {
  return {
    type: 'ADD_SONG',
    song: song
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
