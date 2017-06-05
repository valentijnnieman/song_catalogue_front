import React from 'react';
import Accordion from './accordion.js';
import Modal from './modal.js';
import Version from './version.js';
import {addVersion} from '../actions/versions.js'
import {addSong} from '../actions/songs.js'
import {removeSong} from '../actions/songs.js'
import { connect } from 'react-redux'
import './song.scss'

let Song = ({dispatch, song_id, song}) => {
  let input
  let versions = song.versions.map((version, index) =>  {
    return <Version key={index} version_id={index} version={version} song_id={song_id} />
  })
  return <Accordion title={song.title}>
    {versions}
		<Modal label='-'>
      <h3 className='modal-label'>Really remove this song?</h3>
      <button className='button button--wide' onClick={() => dispatch(removeSong(song_id))}>Remove Song</button>
    </Modal>
		<Modal label='+' sub={true}>
      <h3 className='modal-label modal-label--sub'>Add new version</h3>
			<form onSubmit={e => {
				e.preventDefault()
				if (!input.value.trim()) {
					return
				}
				dispatch(addVersion(song_id, song.versions.length, input.value))
			}}>
      <input className="input input--modal input--sub" placeholder="Enter version title..." ref={node => {
        input = node
      }} />
			<button type="submit" className="button button--sub button--wide">Add</button>
			</form>
		</Modal>
  </Accordion>
};

let AddSong= ({ dispatch }) => {
  let input

  return (
		<Modal label='+'>
			<h3 className='modal-label'>Add new song</h3>
				<form onSubmit={e => {
					e.preventDefault()
					if (!input.value.trim()) {
						return
					}
					dispatch(addSong(input.value))
					input.value = ''
				}}>
					<button type="submit" className="button button--wide">
						add
					</button>
					<input className="input input--modal" placeholder="Enter song title..." ref={node => {
						input = node
					}} />
				</form>
			</Modal>
  )
}

AddSong = connect()(AddSong)
Song = connect()(Song)

export { Song, AddSong }
