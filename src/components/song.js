import React from 'react';
import Accordion from './accordion.js';
import Version from './version.js';
import {addVersion} from '../actions/versions.js'
import { connect } from 'react-redux'

let Song = ({dispatch, song}) => {
  let input
  let versions = song.versions.map((version, index) =>  {
    return <Version key={index} version={version} song_id={song.id} />
  })
  return <Accordion title={song.title}>
    {versions}
    <form onSubmit={e => {
      e.preventDefault()
      if (!input.value.trim()) {
        return
      }
      dispatch(addVersion(song.id, song.versions.length, input.value))
    }}>
    <button type="submit" className="new_song_input new_song_input--button new_song_input--version">
      +
    </button>
    <input className="new_song_input new_song_input--version" placeholder="Enter version title..." ref={node => {
      input = node
    }} />
    </form>
  </Accordion>
};

Song = connect()(Song)
export default Song