import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { Song } from './components/song.js';
import { AddSong } from './components/song.js';
import { ResetPassword } from './components/login.js';
import LoginContainer from './components/login.js';
import store from './store.js';
import {fetchSongs} from './actions/songs.js'
import Modal from './components/modal.js';
import './main.scss'

const SongList = ({token, songs}) => {
  let list_songs
  if (songs != null) {
    list_songs = songs.map((song, index) =>
      <Song key={index} token={token} song_index={index} song={song}></Song>
    );
  } else {
    list_songs = <div>Empty</div>
  }
  return <div>
    {list_songs} 
    </div>
};

const mapStateToProps = (state) => {
  return { 
    is_authenticating: state.is_authenticating,
    authenticated: state.authenticated,
    is_fetching: state.is_fetching,
    invalidate: state.invalidate,
    message: state.message,
    songs: state.songs,
    token: state.token
  }
}

let Topbar = () => {
  const logOut = () => {
    localStorage.removeItem('song_catalogue');
    location.reload()
  }
  return <nav>
  <div className="nav-wrapper">
    <ul className="left">
      <li><a>Song Catalogue</a></li>
    </ul>
    <ul className="right">
      <li><Modal label='Reset password' wide={true}>
          <h4 className='modal-label'>Reset password</h4>
          <ResetPassword />
      </Modal></li>
      <li><a className='btn ' onClick={logOut}>Log out</a></li>
    </ul>
  </div>
</nav>
}


//store.dispatch(fetchLogin())

const AllSongsList = ({token, songs, message, is_authenticating, authenticated, is_fetching}) => {
  if(is_authenticating || authenticated)
    if(authenticated)
      if(is_fetching)
        return <div className='loading-screen'>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>  
        </div>
      else
        if(typeof(songs) !== 'undefined') 
          return <div className='songlist'>
              <SongList token={token} songs={songs} />
              <AddSong token={token} />
            </div>
        else
          return <div>
            <h1> Oops! Something went wrong... </h1>
          </div>
    else
      return <div className='loading-screen'>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>  
      </div>
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
