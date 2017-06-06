import React from 'react';
import Accordion from './accordion.js';
import Modal from './modal.js';
import {editVersion} from '../actions/versions.js'
import {removeVersion} from '../actions/versions.js'
import { connect } from 'react-redux'

import { PlayButton, Progress, Icons } from 'react-soundplayer/components';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { SoundCloudAudio } from 'soundcloud-audio';

import './version.scss'

const { SoundCloudLogoSVG } = Icons;
const clientId = 'I49FIxeHiQfMWdhxi0pI7MjiV210nFx6';

let Version = ({dispatch, version_id, version, song_id}) => {
  let edited_version = Object.assign({}, version)
  const play_audio = () => {
    console.log("playing audio!")
  }
  return <Accordion sub={true} title={version.title}>
      <div className='version'>
        <form onSubmit={e => {
          e.preventDefault()
          console.log(edited_version)
          dispatch(editVersion(song_id, version_id, Object.assign({}, version, edited_version)))
        }}>
          <div className='version__section version__section--full'>
            <h6>title</h6>
            <input className='version__input' defaultValue={version.title} onChange={e => {edited_version.title = e.target.value}} />
          </div>
          <div className='version__section version__section--full'>
            <h6>recording {version.recording}</h6>
            <SoundPlayerContainer resolveUrl={version.recording} clientId={clientId}>
              <PlayButton
                className='version__play'
              />
              <Progress
                className='audio_progress'
                innerClassName='audio_progress__inner'
              />
            </SoundPlayerContainer>
          </div>
          <div className='version__section version__section--full'>
            <h6>notes</h6>
            <textarea className='version__input version__input--textarea' defaultValue={version.notes} onChange={e => {edited_version.notes = e.target.value}}></textarea>
          </div>
          <div className='version__section version__section--full'>
            <h6>lyrics</h6>
            <textarea className='version__input version__input--textarea' defaultValue={version.lyrics} onChange={e => {edited_version.lyrics = e.target.value}}></textarea>
          </div>
          <input type='submit' className='hidden'/>
          <Modal label='-' sub={true}>
            <h3 className='modal-label'>Really remove this version?</h3>
            <button className='button button--wide' onClick={() => dispatch(removeVersion(song_id, version_id))}>Remove Version</button>
          </Modal>
        </form>
      </div>
    </Accordion>
};

Version = connect()(Version)

export default Version
