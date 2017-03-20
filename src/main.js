import React from 'react';
import ReactDOM from 'react-dom';
import Accordion from './accordion.js';
import dummyData from './data/dummy_songs.js'

const Song = ({song}) => {
  let versions = song.versions.map((version, index) =>  {
    return <Version key={index} version={version} />
  })
  return <Accordion title={song.title}>
    {versions}
  </Accordion>
};

const Version = ({version}) => {
  return <Accordion sub={true} title={version.title}>
      <div className='version'>
        <div className='version__section'>
          <h6>title</h6>
          <h3>{version.title}</h3>
        </div>
        <div className='version__section'>
          <h6>added on</h6>
          <h3>{version.created_at}</h3>
        </div>
        <div className='version__section'>
          <h6>recording</h6>
          <h3>{version.recording}</h3>
        </div>
        <div className='version__section'>
          <h6>notes</h6>
          <p>{version.notes}</p>
        </div>
        <div className='version__section'>
          <h6>lyrics</h6>
          <p>{version.lyrics}</p>
        </div>
      </div>
    </Accordion>
};

const SongList = ({songs}) => {
  let list_songs = songs.map((song, index) =>
    <Song key={index} song={song}></Song>
  );
  return <div>
    {list_songs} 
    </div>
};

const Dashboard = () => {
  return <div>
      <SongList songs={dummyData} />
    </div>
};

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
