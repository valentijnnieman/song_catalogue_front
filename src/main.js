import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { Song } from './components/song.js';
import { AddSong } from './components/song.js';
import LoginContainer from './components/login.js';
import store from './store.js';
import {fetchSongs} from './actions/songs.js'
import './main.scss'

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
    is_authenticating: state.is_authenticating,
    authenticated: state.authenticated,
    is_fetching: state.is_fetching,
    invalidate: state.invalidate,
    message: state.message,
    songs: state.songs
  }
}

let Topbar = () => {
  const logOut = () => {
    localStorage.removeItem('song_catalogue');
    location.reload()
  }
  return <div className='topbar'>
    <div className='topbar_container'>
      <h1 className='topbar__title'> Your Songs </h1> 
      <button className='topbar__button button button--wide notice-box' onClick={logOut}>Log out</button>
      <img className='topbar__image' src="./assets/images/sc_logo.png" width={64} height={43} />
      <span>powered by</span>
    </div>
  </div>
}


//store.dispatch(fetchLogin())

const AllSongsList = ({songs, message, is_authenticating, authenticated, is_fetching}) => {
  if(is_authenticating || authenticated)
    if(authenticated)
      if(is_fetching)
        return <h1>Loading...</h1>
      else
        if(typeof(songs) !== 'undefined') 
          return <div className='songlist'>
              <SongList songs={songs} />
              <AddSong />
            </div>
        else
          return <div>
            <h1> Oops! Something went wrong... </h1>
          </div>
    else
      return <h1>Authenticating...</h1>
  else
    return <LoginContainer message={message}/> 
};

const Main = () => {
  return <div>
    <Topbar />
    <App />
  </div>
}

const App = connect(
  mapStateToProps
)(AllSongsList)

store.subscribe(()=>{
  localStorage.setItem('song_catalogue', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
)
