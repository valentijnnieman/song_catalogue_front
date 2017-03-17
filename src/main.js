import React from 'react';
import ReactDOM from 'react-dom';
import Accordion from './accordion.js';

fetch('http://localhost:8080/song').then(function(response) {
  return response.json()
}).then(function(returnedValue) {
  console.log(returnedValue)
});

const dummy_song = {
  "title": "Dummy Dummy Dummy",
  "versions": [
    { 
      "title": "dummy_recording_in_basement",
      "created_at": "14 march, 2017",
      "recording": "file.mp3",
      "notes": "Recorded in my basement, the bass is a little low but sounds cool. Guitar sounds bad. Revise!",
      "lyrics": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et posuere mi. Vestibulum tincidunt odio urna, eu vestibulum nisl fermentum ut. Etiam mollis dui et quam scelerisque dignissim. Proin tempor, ipsum et elementum tempus, diam tortor congue orci, quis laoreet leo augue sit amet orci. Suspendisse convallis vel neque in semper."
    },
    { 
      "title": "dummy_live_2017",
      "recording": "file.mp3",
      "created_at": "14 march, 2017",
      "notes": "This live recording is kick ass!",
      "lyrics": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et posuere mi. Vestibulum tincidunt odio urna, eu vestibulum nisl fermentum ut. Etiam mollis dui et quam scelerisque dignissim. Proin tempor, ipsum et elementum tempus, diam tortor congue orci, quis laoreet leo augue sit amet orci. Suspendisse convallis vel neque in semper."
    }
  ]
}

class Song extends React.Component {
  render() {
    let versions = this.props.song.versions.map((version) =>  {
      return <Version version={version} />
    })
    return <Accordion title={this.props.song.title}>
      {versions}
    </Accordion>
  }
}

class Version extends React.Component {
  render() {
    return <div className='version'> 
      <Accordion sub={true} title={this.props.version.title}></Accordion>
    </div> 
  }
}

const song1 = <Song song={dummy_song} />

ReactDOM.render(
  song1,
  document.getElementById('root')
)
