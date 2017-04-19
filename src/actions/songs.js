import fetch from 'isomorphic-fetch'
import store from '../store.js';

let next_id = 2
// TO-DO: get correct id --^
//
export const requestSongs = () => {
  console.log('REquesting songs!')
  fetch('http://localhost:8080/artist/1')
  .then(response => {
    console.log("response", response)
    return response.json()
  })
  .then(json => { 
    console.log("json", json)
    // eep!
    store.dispatch(recieveSongs(json.artist.songs))
  })
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
