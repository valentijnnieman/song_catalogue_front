import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { Song } from './components/song.js';
import { AddSong } from './components/song.js';
import store from './store.js';
import {fetchSongs} from './actions/songs.js'
import {fetchLogin} from './actions/songs.js'
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

let Login = ({dispatch, message}) => {
  let username, password

  return <div className='login'>
    <div className='notice'>{message}</div>
    <form className='form--login' onSubmit={e => {
      e.preventDefault()
      if (!username.value.trim()) {
        return
      }
      store.dispatch(fetchLogin(username.value, password.value))
    }}>
    <input className="input input--sub" placeholder="User name" ref={node => {
      username = node
    }} />
    <input type='password' className="input input--sub" placeholder="Password" ref={node => {
      password = node
    }} />
    <button type="submit" className="button button--sub button--wide">Login</button>
    </form>
    <button className="button button--wide notice-box" onClick={() => store.dispatch(fetchLogin('demo', 'demo123'))}>Login as Guest</button>
  </div>
}

//store.dispatch(fetchLogin())

const AllSongsList = ({songs, message, is_authenticating, authenticated, is_fetching}) => {
  if(is_authenticating || authenticated)
    if(authenticated)
      if(is_fetching)
        return <h1>Loading...</h1>
      else
        return <div>
            <SongList songs={songs} />
            <AddSong />
          </div>
    else
      return <h1>Authenticating...</h1>
  else
    return <Login message={message}/>
};

const App = connect(
  mapStateToProps
)(AllSongsList)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
