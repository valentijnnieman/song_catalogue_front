import React from 'react';
import Accordion from './accordion.js';
import Modal from './modal.js';
import Version from './version.js';
import {createVersion} from '../actions/versions.js'
import {createSong} from '../actions/songs.js'
import {deleteSong} from '../actions/songs.js'
import { connect } from 'react-redux'
import './song.scss'

let Song = ({token, dispatch, song_index, song}) => {
  let input
  let versions
  if(song.versions != null && song.versions.length > 0) { 
    versions = song.versions.map((version, index) =>  {
      return <Version key={index} 
              token={token}
              version_index={index} 
              version={version} 
              song_index={song_index} 
              song_id={song.ID} />
    })
  }
  return <Accordion title={song.title}>
    {versions}
		<Modal label='-'>
      <h3 className='modal-label'>Really remove this song?</h3>
      <button className='button button--wide' onClick={() => dispatch(deleteSong(token, song_index, song.ID))}>Remove Song</button>
    </Modal>
		<Modal label='+' sub={true}>
      <h3 className='modal-label modal-label--sub'>Add new version</h3>
			<form onSubmit={e => {
				e.preventDefault()
				if (!input.value.trim()) {
					return
				}
				dispatch(createVersion(token, song_index, song.ID, song.versions.length, input.value))
			}}>
      <input className="input input--modal input--sub" placeholder="Enter version title..." ref={node => {
        input = node
      }} />
			<button type="submit" className="button button--sub button--wide">Add</button>
			</form>
		</Modal>
  </Accordion>
};

let AddSong= ({ token, dispatch }) => {
  let input

  return (
		<Modal label='+'>
			<h3 className='modal-label'>Add new song</h3>
				<form onSubmit={e => {
					e.preventDefault()
					if (!input.value.trim()) {
						return
					}
					dispatch(createSong(token, input.value))
					input.value = ''
          this.props.reveal_content()
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
