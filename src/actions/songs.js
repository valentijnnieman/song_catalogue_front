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
      }
    })
  }
}
export function deleteSong(token, song_index, song_id) {
  return function (dispatch) {
    return fetch(`${endpoint}auth/song/${song_id}/delete`, {
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
      }
    })
  }
}
export function fetchLogin(email, password) {
  return function (dispatch) {
    dispatch(requestLogin())

    return fetch(`${endpoint}login`, {
        method: "POST",
        body: JSON.stringify({
          username: email, // jwt middleware requires json to be 'username'!
          password: password 
        })
      })
      .then(response => {
        if(response.ok) {
          response.json()
          .then(json => { 
            store.dispatch(recieveLogin(json.token))
            store.dispatch(fetchSongs(json.token))
          })
        }
        else { 
          store.dispatch(failedLogin("Incorrect username or password"))
        }
      })
  }
}
export function fetchRegister(email, password) {
  return function (dispatch) {
    return fetch(`${endpoint}register`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password 
        })
      })
      .then(response => {
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
export function fetchPasswordReset(token, email, password, newPassword) {
  return function (dispatch) {
    return fetch(`${endpoint}auth/user/reset`, {
        headers: {
          'Authorization': 'Bearer ' + token, 
          'Content-Type': 'application/json'
        }, 
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          newPassword: newPassword 
        })
      })
      .then(response => {
        if(response.ok) {
          response.json()
          .then(json => { 
            store.dispatch(failedLogin("Password reset complete. Please login again"))
          })
        }
        else { 
          // store.dispatch(failedReset("Email or password was incorrect"))
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
        return response.json()
      })
      .then(json => { 
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
  return {
    type: 'REMOVE_SONG',
    song_id: song_id
  }
}
