import React from 'react';
import Accordion from './accordion.js';
import {editVersion} from '../actions/versions.js'
import {removeVersion} from '../actions/versions.js'
import { connect } from 'react-redux'

let Version = ({dispatch, version_id, version, song_id}) => {
  let edited_version = Object.assign({}, version)
  return <Accordion sub={true} title={version.title}>
      <div className='version'>
        <form onSubmit={e => {
          e.preventDefault()
          dispatch(editVersion(Object.assign({}, version, edited_version), song_id))
        }}>
          <div className='version__section'>
            <h6>title</h6>
            <input className='version__input' defaultValue={version.title} onChange={e => {edited_version.title = e.target.value}} />
          </div>
          <div className='version__section'>
            <h6>added on</h6>
            <input className='version__input' defaultValue={version.created_at} onChange={e => {edited_version.created_at = e.target.value}} />
          </div>
          <div className='version__section version__section--full'>
            <h6>recording</h6>
            <input className='version__input' defaultValue={version.recording} onChange={e => {edited_version.recording = e.target.value}} />
          </div>
          <div className='version__section version__section--full'>
            <h6>notes</h6>
            <textarea className='version__input version__input--textarea' defaultValue={version.notes} onChange={e => {edited_version.notes = e.target.value}}></textarea>
          </div>
          <div className='version__section version__section--full'>
            <h6>lyrics</h6>
            <textarea className='version__input version__input--textarea' defaultValue={version.lyrics} onChange={e => {edited_version.lyrics = e.target.value}}></textarea>
          </div>
          <input type='submit' className='version__submit' value='Save all'/>
          <button className='song__submit' onClick={() => dispatch(removeVersion(song_id, version_id))}>Remove</button>
        </form>
      </div>
    </Accordion>
};

Version = connect()(Version)

export default Version
