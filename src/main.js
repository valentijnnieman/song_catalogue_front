import React from 'react';
import ReactDOM from 'react-dom';
import Accordion from './accordion.js';
import dummyData from './data/dummy_songs.js'

class Song extends React.Component {
  render() {
    let versions = this.props.song.versions.map((version, index) =>  {
      return <Version key={index} version={version} />
    })
    return <Accordion title={this.props.song.title}>
      {versions}
    </Accordion>
  }
}

class Version extends React.Component {
  render() {
    return <Accordion sub={true} title={this.props.version.title}>
        <div className='version'>
          <div className='version__section'>
            <h6>title</h6>
            <h3>{this.props.version.title}</h3>
          </div>
          <div className='version__section'>
            <h6>added on</h6>
            <h3>{this.props.version.created_at}</h3>
          </div>
          <div className='version__section'>
            <h6>recording</h6>
            <h3>{this.props.version.recording}</h3>
          </div>
          <div className='version__section'>
            <h6>notes</h6>
            <p>{this.props.version.notes}</p>
          </div>
          <div className='version__section'>
            <h6>lyrics</h6>
            <p>{this.props.version.lyrics}</p>
          </div>
        </div>
      </Accordion>
  }
}

class SongList extends React.Component {
  render() {
    let list_songs = this.props.songs.map((song, index) =>
      <Song key={index} song={song}></Song>
    );
    return <div>
      {list_songs} 
      </div>
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: [],
      token: ''
    }
  }
  componentDidMount() {
    let self = this

    self.showSongs()
  }
  showSongs() {
    this.setState({songs: dummyData})
  }
  render() {
    return <div>
        <SongList songs={this.state.songs} />
      </div>
  }
}


ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
