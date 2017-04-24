import React from 'react';
import Modal from './modal.js';
import { connect } from 'react-redux'
import {addSong} from '../actions/songs.js'

let AddSong= ({ dispatch }) => {
  let input

  return (
		<Modal label='Add song'>
			<h3 className='modal-label'>Add new song</h3>
				<form onSubmit={e => {
					e.preventDefault()
					if (!input.value.trim()) {
						return
					}
					dispatch(addSong(input.value))
					input.value = ''
				}}>
					<button type="submit" className="button">
						+
					</button>
					<input className="input" placeholder="Enter song title..." ref={node => {
						input = node
					}} />
				</form>
			</Modal>
  )
}

AddSong = connect()(AddSong)

export default AddSong
