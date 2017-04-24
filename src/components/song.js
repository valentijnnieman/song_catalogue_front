import React from 'react';
import Accordion from './accordion.js';
import Modal from './modal.js';
import Version from './version.js';
import {addVersion} from '../actions/versions.js'
import {removeSong} from '../actions/songs.js'
import { connect } from 'react-redux'

let Song = ({dispatch, song_id, song}) => {
  let input
  let versions = song.versions.map((version, index) =>  {
    return <Version key={index} version_id={index} version={version} song_id={song_id} />
  })
  return <Accordion title={song.title}>
    {versions}
    <button className='button button--wide' onClick={() => dispatch(removeSong(song_id))}>Remove Song</button>
		<Modal label='Add version' sub={true}>
      <h3 className='modal-label modal-label--sub'>Add new version</h3>
			<form onSubmit={e => {
				e.preventDefault()
				if (!input.value.trim()) {
					return
				}
				dispatch(addVersion(song.id, song.versions.length, input.value))
			}}>
      <input className="input input--sub" placeholder="Enter version title..." ref={node => {
        input = node
      }} />
			<button type="submit" className="button button--sub button--wide">Add</button>
			</form>
		</Modal>
  </Accordion>
};

Song = connect()(Song)
export default Song
