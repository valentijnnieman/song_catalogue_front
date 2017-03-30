import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Song from './components/song.js';
import AddNewSong from './components/add_new_song.js';
import store from './store.js';

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
