import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Song from './components/song.js';
import AddNewSong from './components/add_new_song.js';
import store from './store.js';
import {requestSongs} from './actions/songs.js'

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
    state: state
  }
}

const AllSongsList = ({state}) => {
  store.dispatch(requestSongs())

  console.log("state", state)
  return <div>
      <SongList songs={state.songs} />
      <AddNewSong />
    </div>
};

const AppState = connect(
  mapStateToProps
)(AllSongsList)

const App = () => {
  return <div>
    <AppState />
  </div>
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
