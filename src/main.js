import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Accordion from './accordion.js';
import AddNewSong from './add_new_song.js';
import store from './store.js';
import {editVersion} from './actions/versions.js'

const Song = ({song}) => {
  let versions = song.versions.map((version, index) =>  {
    return <Version key={index} version={version} />
  })
  return <Accordion title={song.title}>
    {versions}
  </Accordion>
};

let Version = ({dispatch, version}) => {
  let edited_version = Object.assign({}, version)
  return <Accordion sub={true} title={version.title}>
      <div className='version'>
        <form onSubmit={e => {
          e.preventDefault()
          dispatch(editVersion(Object.assign({}, version, edited_version)))
        }}>
          <div className='version__section'>
            <h6>title</h6>
            <input className='version__input' defaultValue={version.title} onChange={e => {edited_version.title = e.target.value}} />
          </div>
          <div className='version__section'>
            <h6>added on</h6>
            <input className='version__input' defaultValue={version.created_at} onChange={e => {edited_version.created_at = e.target.value}} />
          </div>
          <div className='version__section'>
            <h6>recording</h6>
            <input className='version__input' defaultValue={version.recording} onChange={e => {edited_version.recording = e.target.value}} />
          </div>
          <div className='version__section'>
            <h6>notes</h6>
            <textarea className='version__input version__input--textarea' defaultValue={version.notes} onChange={e => {edited_version.notes = e.target.value}}></textarea>
          </div>
          <div className='version__section'>
            <h6>lyrics</h6>
            <textarea className='version__input version__input--textarea' defaultValue={version.lyrics} onChange={e => {edited_version.lyrics = e.target.value}}></textarea>
          </div>
          <input type='submit' className='hidden' />
        </form>
      </div>
    </Accordion>
};

Version = connect()(Version)

const SongList = ({songs}) => {
  let list_songs = songs.map((song, index) =>
    <Song key={index} song={song}></Song>
  );
  return <div>
    {list_songs} 
    </div>
};

const mapStateToProps = (state) => {
  console.log("mapstatetoprops", state);
  return {
    songs: state
  }
}

const AllSongsList = connect(
  mapStateToProps
)(SongList)

const Dashboard = () => {
  return <div>
      <AllSongsList />
      <AddNewSong />
    </div>
};

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('root')
)
