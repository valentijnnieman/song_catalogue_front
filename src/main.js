import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import Song from './components/song.js';
import AddNewSong from './components/add_new_song.js';
import store from './store.js';
import {fetchSongs} from './actions/songs.js'

const SongList = ({songs}) => {
  console.log("SongList.songs: ", songs)
  let list_songs = songs.map((song, index) =>
    <Song key={index} song_id={index} song={song}></Song>
  );
  return <div>
    {list_songs} 
    </div>
};

const mapStateToProps = (state) => {
  console.log("mapstatetoprops", state);
  return { 
    is_fetching: state.is_fetching,
    invalidate: state.invalidate,
    songs: state.songs
  }
}

store.dispatch(fetchSongs())

const AllSongsList = ({songs, is_fetching}) => {

  console.log("state", is_fetching)
  if(is_fetching)
    return <h1>Loading...</h1>
  else
    return <div>
        <SongList songs={songs} />
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
    <AppState />
  </Provider>,
  document.getElementById('root')
)
