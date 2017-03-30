import React from 'react';
import Accordion from './accordion.js';
import Version from './version.js';
import {addVersion} from '../actions/versions.js'
import { connect } from 'react-redux'

let Song = ({dispatch, song}) => {
  let versions = song.versions.map((version, index) =>  {
    return <Version key={index} version={version} song_id={song.id} />
  })
  return <Accordion title={song.title}>
    {versions}
    <button className='version__submit' onClick={() => dispatch(addVersion(song.id, song.versions.length))}>+</button>
  </Accordion>
};

Song = connect()(Song)
export default Song
