import React from 'react';
import { connect } from 'react-redux'
import {addSong} from '../actions/songs.js'

let AddSong= ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addSong(input.value))
        input.value = ''
      }}>
        <button type="submit" className="new_song_input new_song_input--button">
          +
        </button>
        <input className="new_song_input" defaultValue="Enter song title..." ref={node => {
          input = node
        }} />
      </form>
    </div>
  )
}

AddSong = connect()(AddSong)

export default AddSong
