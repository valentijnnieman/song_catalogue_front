import fetch from 'isomorphic-fetch'
import store from '../store.js';
import {endpoint} from '../config.js';

export function createSong(token, title) {
  return function (dispatch) {
    return fetch(`${endpoint}auth/song/create`, {
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
          // store.dispatch(addSong(json.song))
          store.dispatch(fetchSongs(token))
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
    return fetch(`${endpoint}/auth/song/${song_id}/delete`, {
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
export function fetchLogin(email, password) {
  return function (dispatch) {
    dispatch(requestLogin())

    console.log(endpoint + 'login')
    return fetch(`${endpoint}login`, {
        method: "POST",
        body: JSON.stringify({
          username: email, // jwt middleware requires json to be 'username'!
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
export function fetchRegister(email, password) {
  return function (dispatch) {
    dispatch(requestLogin())

    return fetch(`${endpoint}register`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password 
        })
      })
      .then(response => {
        console.log("response", response)
        if(response.ok) {
          response.json()
          .then(json => { 
            // eep!
            store.dispatch(fetchLogin(email, password))
          })
        }
        else { 
          store.dispatch(failedLogin("Account already exists!"))
        }
      })
  }
}
export function fetchSongs(token) {
  return function (dispatch) {
    dispatch(requestSongs())

    return fetch(`${endpoint}auth/songs`, {
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
