import React from 'react';
import Accordion from './accordion.js';
import Modal from './modal.js';
import {updateVersion} from '../actions/versions.js'
import {updateRecording} from '../actions/versions.js'
import {deleteVersion} from '../actions/versions.js'
import { connect } from 'react-redux'

import Dropzone from 'react-dropzone'

import './version.scss'

let Version = ({dispatch, token, version_index, version, song_index, song_id}) => {
  let edited_version = Object.assign({}, version)
  const play_audio = () => {
  }
  const upload_recording = (file) => {
    if(file[0].type == "audio/mp3") {
      if(file[0].size < 12000000 ){
        dispatch(updateRecording(token, song_index, song_id, version_index, version.ID, file[0]))
      }
    }
  }
  let closeButton = <Modal label='x' sub={true} wide={true}>
                      <h5 className='modal-label'>Really remove this version?</h5>
                      <button className='btn' 
                        onClick={() => dispatch(deleteVersion(token, song_index, song_id, version_index, version.ID))}>
                        Remove Version
                      </button>
                    </Modal>
  return <Accordion sub={true} title={version.title} button={closeButton}>
      <div className='version'>
        <form onBlur={e => {
          e.preventDefault()
          dispatch(updateVersion(token, song_index, song_id, version_index, Object.assign({}, version, edited_version)))
        }} onSubmit={e => {
          e.preventDefault() 
          dispatch(updateVersion(token, song_index, song_id, version_index, Object.assign({}, version, edited_version)))
        }} >
          <div className='version__section version__section--full'>
            <h6>title</h6>
            <input className='version__input' 
              defaultValue={version.title} 
              onChange={e => {edited_version.title = e.target.value}} 
            />
          </div>
          <div className='version__section version__section--full'>
            <h6>recording</h6>
            <Dropzone accept="audio/mp3" className='version__input version__input--upload' onDrop={upload_recording}>
              <div className="button button--upload button--sub button--wide">Click or drag new recording here</div>
            </Dropzone>
            <audio className='version__audio' controls>
              <source src={version.recording} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
          <div className='version__section version__section--full'>
            <h6>notes</h6>
            <textarea className='version__input version__input--textarea' 
              defaultValue={version.notes} 
              onChange={e => {edited_version.notes = e.target.value}}>
            </textarea>
          </div>
          <div className='version__section version__section--full'>
            <h6>lyrics</h6>
            <textarea className='version__input version__input--textarea' 
              defaultValue={version.lyrics} 
              onChange={e => {edited_version.lyrics = e.target.value}}>
            </textarea>
          </div>
          <input type='submit' className='hidden'/>
        </form>
      </div>
    </Accordion>
};

Version = connect()(Version)

export default Version
