import React from 'react';
import { connect } from 'react-redux'
import {addSong} from './actions/songs.js'

let AddSong= ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        console.log(input.value)
        dispatch(addSong(input.value))
        input.value = ''
      }}>
        <button type="submit" className="new_song_input new_song_input--button">
          +
        </button>
        <input className="new_song_input" ref={node => {
          input = node
        }} />
      </form>
    </div>
  )
}

AddSong = connect()(AddSong)

export default AddSong 
