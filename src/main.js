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
  let title, created_at, recording, notes, lyrics
  return <Accordion sub={true} title={version.title}>
      <div className='version'>
        <form onSubmit={e => {
          e.preventDefault()
          dispatch(editVersion(version))
        }}>
          <div className='version__section'>
            <h6>title</h6>
            <input className='version__input' defaultValue={version.title} onChange={e => {version.title = e.target.value}} />
          </div>
          <div className='version__section'>
            <h6>added on</h6>
            <input className='version__input' defaultValue={version.created_at} />
          </div>
          <div className='version__section'>
            <h6>recording</h6>
            <input className='version__input' defaultValue={version.recording} />
          </div>
          <div className='version__section'>
            <h6>notes</h6>
            <textarea className='version__input version__input--textarea' defaultValue={version.notes}></textarea>
          </div>
          <div className='version__section'>
            <h6>lyrics</h6>
            <textarea className='version__input version__input--textarea' defaultValue={version.lyrics}></textarea>
          </div>
          <input type='submit' />
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
